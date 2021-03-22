const pool = require("../db");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
require("dotenv").config();
function validPhone(phoneNo) {
    return /^[6-9]\d{9}$/.test(phoneNo);
};
exports.otpSend = async (req, res, next) => {
    try {
        const path = req.query.h;
        const { phone } = req.body;
        // //valid phone no.
        if (!phone) {
            return res.status(401).json("missing Email password phone no. or name");
        } else if (!validPhone(phone)) {
            return res.status(401).json("Invalid Phone no.");
        };
        //check whether phone no. exist in table or not 
        if (path === "user") {
            const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1", [phone]);
            if (phone_no.rows.length << 0) {
                return res.status(401).json("Phone no. in use");
            };
        } else if (path === "cs") {
            const phone_no = await pool.query("SELECT * FROM charging_station WHERE cs_phone = $1", [phone]);
            if (phone_no.rows.length << 0) {
                return res.status(401).json("Phone no. in use");
            };
        } else {
            res.json("Invalid OTP")
        }
        const resendStatus = await pool.query("UPDATE otp SET resend_status = true,expiry_status = true WHERE otp_phone = $1 AND otp_route =$2", [phone, path]);
        const otp = await otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        const timeInMinute = 60*1000//5 minutes to milliseconds
        const expire = Date.now() + timeInMinute;
        const data = `${phone}${otp}${expire}`;
        const saltRound = 9;
        const Salt = bcrypt.genSalt(saltRound);
        const bcryptHash = await bcrypt.hash(data, saltRound);
        console.log(path,otp);
        req.bcryptHash = bcryptHash;
        req.otp = otp;
        req.expire = expire;
        req.phone = phone;
        req.otpRoute = path;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
};

exports.otpVerify = async (req, res, next) => {
    try {
        const { phone, otpToken } = req.body;
        const path = req.query.h;
        // if user enter old OTP will return expired
        // const otpDb1 = await pool.query("SELECT * from otp WHERE otp_phone = $1 AND otp_route = $2 AND otp_token=$3", [phone,path,otpToken]);
        // if(otpDb1.rows.length === 0){
        //     return res.json("Incorrect OTP");
        // };
        // if(otpDb1.rows[0].resend_status === true){
        //     return res.json("You entered old OTP enter New OTP");
        // };
        const otpDb = await pool.query("SELECT * from otp WHERE otp_phone = $1 AND resend_status = false AND otp_route = $2", [phone,path]);
        if(otpDb.rows.length === 0){
            return res.json("OTP YOU ENTERED is incorrect or is NOT valid in this route ");
        };
        if(otpDb.rows.length === 0){
            return res.json("Please request the OTP then Click on verify");
        };
        if (otpDb.rows[0].otp_route !== path) {
            return res.json("OTP is NOT valid in this route");
        };
        hash = otpDb.rows[0].otp_hash;
        expire = otpDb.rows[0].otp_expire;
        if (otpDb.rows[0].expiry_status === true||parseInt(expire) < Date.now() ) {
            const expiryStatus = await pool.query("UPDATE otp SET expiry_status = true WHERE otp_phone = $1 AND otp_route =$2 AND otp_token =$3", [phone, path,otpDb.rows[0].otp_token]);
            return res.json("OTP expired");
        };
        const validOtp = await bcrypt.compare(phone + otpToken + expire, hash);
        if (!validOtp) {
            return res.status(401).json("OTP is invalid");
        };
        res.json(true)
        const verifyStatus = pool.query("UPDATE otp SET otp_ver = true WHERE otp_phone = $1 AND otp_token = $2 AND otp_route= $3", [phone, otpToken, path]);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
};