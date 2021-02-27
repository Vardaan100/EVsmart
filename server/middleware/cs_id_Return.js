const jwt = require("jsonwebtoken");
const pool = require("../db")
require("dotenv").config();

csIdReturn = async (req, res, next) => {
    try {
        // console.log(req)
        const jwtToken = req.params.id
        // console.log(jwtToken)
        if (!jwtToken) {
            return res.status(403).json("Provide token")
        }
        //verify the token input in req 
        const verify = jwt.verify(jwtToken, process.env.jwtSecret);
        if (!verify) {
            return res.status(403).json("NOT AUTHORISED(invalid token");
        };

        userID = verify.user;
        // console.log(userID)
        req.user = verify.user;
        // const csExist = await pool.query("SELECT * FROM charging_station WHERE user_ID =$1", [userID]);
        // if (csExist.rows.length === 0) {
        //     return res.status(401).json("YOU HAVE NO CHARGING STATION ADDED");
        // };
        const csID = await pool.query(" SELECT cs_id FROM charging_station WHERE user_id = $1", [userID]);
        const ID = csID.rows ; 
        const a = ID[0].cs_id;
        // console.log(a)
        req.csid= a



        // let arr = [];
        // for (let i in ID) {
        //     arr.push(ID[i].cs_id);
        //     req.user = arr;
        //     console.log(arr)
        // }

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("NOT AUTHORISEeD");
    }
}

module.exports = csIdReturn;
