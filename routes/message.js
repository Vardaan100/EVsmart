const router = require("express").Router();
const pool = require("../db");
const { isAuth, isAdmin } = require("../middleware/isAuth");
const { otpSend, otpVerify } = require("../middleware/otp");
const { smsSend } = require("../middleware/sms");
const unirest = require("unirest");
require("dotenv").config();

router.post("/addFormat", (req, res) => {
    res.json("hellomessage");
});

// creating message format
router.post("/addFormat/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const { name, format } = req.body
        const checkName = await pool.query("SELECT * FROM message_format where message_name = $1", [name]);
        if (checkName.rows.length << 0) {
            return res.status(401).json("message format already exist");
        };
        const format1 = await pool.query("INSERT INTO message_format(message_name,message_format,user_id) VALUES ($1,$2,$3) RETURNING *", [name, format, req.userID]);
        res.json(format1.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

// read message format
router.get("/getFormat/:id", isAuth, async (req, res) => {
    try {
        const name = req.query.formatName;
        const format = await pool.query("SELECT message_format FROM message_format WHERE message_name = $1", [name]);
        // if (format.rows.length === 0) {
        //     return res.status(401).json("INVALID Message name");
        // };
        const name11 = format.rows[0].message_format;
        res.json(format.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
})

// read all message format
router.get("/allformat/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const format = await pool.query("SELECT * FROM message_format");
        if (format.rows.length === 0) {
            return res.status(401).json("NO FORMAT ADDED");
        };
        res.json(format.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});


// updating messaging format 
router.put("/updateFormat/:id", isAuth, isAdmin, async (req, res) => {
    try {
        // console.log("hi", req.userID)
        const { name, format } = req.body
        const checkName = await pool.query("SELECT * FROM message_format where message_name = $1", [name]);
        if (checkName.rows.length === 0) {
            return res.status(401).json("message format not exist");
        };
        const format1 = await pool.query("UPDATE message_format SET message_format=$2,user_id=$3 WHERE message_name =$1 RETURNING *", [name, format, req.userID]);
        res.json(format1.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//delete message format 
router.delete("/deleteFormat/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const name = req.query.formatName;
        const checkName = await pool.query("SELECT * FROM message_format where message_name = $1", [name]);
        if (checkName.rows.length === 0) {
            return res.status(401).json("message format not exist");
        };
        const deleteFormat = pool.query("DELETE FROM message_format WHERE message_name = $1", [name]);
        res.json("deleted sucessfully")
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});



// sms protocol for cs book now button
router.post("/booked/:id", isAuth, async (req, res) => {
    try {
        const { csid } = req.body;
        const csDetail = await pool.query("SELECT cs_phone FROM charging_station WHERE cs_id = $1 ", [csid]);
        const csPhone = csDetail.rows[0].cs_phone;
        const csname = csDetail.rows[0].user_id;
        const userDetail = await pool.query("SELECT user_firstname,user_lastname,user_phone FROM users WHERE user_id = $1 ", [req.userID]);
        const userPhone = userDetail.rows[0].user_phone;
        // const userPhone = 9990372304
        const userName = userDetail.rows[0].user_firstname+" "+userDetail.rows[0].user_lastname;
        const name = "booked";
        const format = await pool.query("SELECT message_format FROM message_format WHERE message_name = $1", [name]);
        format1 = eval('`' + format.rows[0].message_format + '`');
        const Request = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
        Request
            .headers({ "authorization": process.env.smsApi })
            .form({
                "route": "v3",
                "sender_id": process.env.smsID,
                "message_text": format1,
                "language": "english",
                "flash": 0,
                "numbers": csPhone
            })
            .end(async (response) => {
                if (response.error) {
                    return response.error;
                };
                res.json(response.body);
                const messageRes = await pool.query("INSERT INTO message_res(sms_res,\
                    message_sent,cs_phone,user_phone,user_id,cs_id,message_name)\
                     VALUES ($1,$2,$3,$4,$5,$6,$7) \
                     RETURNING *", [response.body, format1, csPhone, userPhone, req.userID, csid, name]);
            });

        //message api for user booking
        let slotArr = ["00:00:00 - 01:00:00", "01:00:00 - 02:00:00", "02:00:00 - 03:00:00", "03:00:00 - 04:00:00", "04:00:00 - 05:00:00", "05:00:00 - 06:00:00", "06:00:00 - 07:00:00", "07:00:00 - 08:00:00", "08:00:00 - 09:00:00", "09:00:00 - 10:00:00", "10:00:00 - 11:00:00", "11:00:00 - 12:00:00", "12:00:00 - 13:00:00", "13:00:00 - 14:00:00", "14:00:00 - 15:00:00", "15:00:00 - 16:00:00", "16:00:00 - 17:00:00", "17:00:00 - 18:00:00", "18:00:00 - 19:00:00", "19:00:00 - 20:00:00", "20:00:00 - 21:00:00", "21:00:00 - 22:00:00", "22:00:00 - 23:00:00", "23:00:00 - 00:00:00"];
        slot = slotArr[Math.floor(Math.random() * slotArr.length)];
        name1 = "userBooked";
        const format2 = await pool.query("SELECT message_format FROM message_format WHERE message_name = $1", [name1]);
        format3 = eval('`' + format2.rows[0].message_format + '`');
        // console.log(format3)
        Request
            .headers({ "authorization": process.env.smsApi })
            .form({
                "route": "v3",
                "sender_id": process.env.smsID,
                "message_text": format3,
                "language": "english",
                "flash": 0,
                "numbers": userPhone
            })
            .end(async (response) => {
                if (response.error) {
                    return response.error;
                };
                res.json(response.body);
                const messageRes = await pool.query("INSERT INTO message_res(sms_res,\
                    message_sent,cs_phone,user_phone,user_id,cs_id,message_name)\
                     VALUES ($1,$2,$3,$4,$5,$6,$7) \
                     RETURNING *", [response.body, format3, csPhone, userPhone, req.userID, csid, name1]);
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

// to send otp at the time of signup when user add phone no
router.post("/otpPhone/", otpSend, async (req, res) => {
    try {
        const name = "otp";
        const format = await pool.query("SELECT message_format FROM message_format WHERE message_name = $1", [name]);
        format1 = eval('`' + format.rows[0].message_format + '`');
        const Request = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
        Request
            .headers({ "authorization": process.env.smsApi })
            .form({
                "route": "v3",
                "sender_id": process.env.smsID,
                "message_text": format1,
                "language": "english",
                "flash": 0,
                "numbers": req.phone
            })
            .end(async (response) => {
                if (response.error) {
                    return response.error;
                };
                // res.json(response.body);
                res.json("OTP sent Successfully");
                const otpRes = await pool.query("INSERT INTO otp(otp_phone,otp_token,otp_expire,\
                        otp_hash,message_sent,message_name,sms_res,otp_route) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) \
                         RETURNING *", [req.phone, req.otp, req.expire, req.bcryptHash, format1, name, response.body, req.otpRoute]);
            })
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

// to verify the otp
router.post("/otpVerify", otpVerify, async (req, res) => {
});


module.exports = router;