const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../db");

csIDReturn = async (req, res, next) => {
    try {
        const jwtToken = req.params.id;
        if (!jwtToken) {
            return res.status(403).json("Provide token")
        }
        //verify the tonken input in req 
        const verify = jwt.verify(jwtToken, process.env.jwtSecret);
        // console.log(verify)
        if (!verify) {
            return res.status(403).json("NOT AUTHORISED(invalid token");
        };
        req.user = verify.user;

        const csExist = await pool.query("SELECT * FROM charging_station WHERE user_ID =$1", [req.user]);
        if (csExist.rows.length === 0) {
            return res.status(401).json("YOU HAVE NO CHARGING STATION ADDED");
        };
        const csID = await pool.query(" SELECT cs_id FROM charging_station WHERE user_id = $1", [req.user]);
        const ID = csID.rows;
        const a = ID[0].cs_id;
        //  console.log(csID)
        req.csid = a
        // console.log(csID)

        // let arr = [];
        // for (let i in ID) {
        //     arr.push(ID[i].cs_id);
        //     req.user = arr;
        //     console.log(arr)
        // }
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("NOT AUTHORISED");
    };
};
module.exports = csIDReturn;