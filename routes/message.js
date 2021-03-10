const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtgenerator");
const verifyInfo = require("../middleware/validInfo");
const { isAuth, isAdmin } = require("../middleware/isAuth");
const jwt = require("jsonwebtoken");
require("dotenv").config()


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
        const name12 = "Hi Suraj ,Naman Gupta ${name}has Choosed Your Charging station to Charge Car Please Contact him Regarding Any Issue below mentioned number (9990372304)"
        console.log(name12);
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
        const { name, format } = req.body
        const checkName = await pool.query("SELECT * FROM message_format where message_name = $1", [name]);
        if (checkName.rows.length === 0) {
            return res.status(401).json("message format not exist");
        };
        const format1 = await pool.query("UPDATE message_format SET message_name=$1,message_format=$2,user_id=$3 WHERE user_id =$3 RETURNING *", [name, format, req.userID]);
        res.json(format1.rows);
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

module.exports = router;