const router = require("express").Router();
const pool = require("../db");
const { isAuth, isAdmin } = require("../middleware/isAuth");
const { otpSend, otpVerify } = require("../middleware/otp");
const unirest = require("unirest");
require("dotenv").config();

exports.smsSend = async (req, res, next) => {
    const { phone } = req.body;
    const name = "otp";
    const format = await pool.query("SELECT message_format FROM message_format WHERE message_name = $1", [name]);
    format1 = eval('`' + format.rows[0].message_format + '`');
    // console.log(smsSend(format1, phone));
    const Request = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
    Request
        .headers({ "authorization": process.env.smsApi })
        .form({
            "route": "v3",
            "sender_id": process.env.smsID,
            "message_text": format1,
            "language": "english",
            "flash": 0,
            "numbers": phone
        })
        .end((response) => {
            if (response.error) {
                return response.error;
            };

            // console.log(response.body)
            res.json(response.body);
            // res.json("OTP sent Successfully");
            const otpRes = pool.query("INSERT INTO otp(otp_phone,otp_token,otp_expire,\
                    otp_hash,message_sent,message_name,sms_res)\
                     VALUES ($1,$2,$3,$4,$5,$6,$7) \
                     RETURNING *", [phone, req.otp, req.expire, req.bcryptHash, format1, name, response.body]);
        });
    next()
};
// module.exports = smsSend;