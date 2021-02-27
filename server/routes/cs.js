const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/verifyAuth");
const userDataToken = require("../middleware/tokenReturn");
const csIdReturn = require("../middleware/cs_id_Return");

router.get("/g/:id", csIdReturn, (req, res) => {
    res.json(req.csid)
    // res.json(req.user)
})
// create charging station
router.post("/newcs/:id", userDataToken, async (req, res) => {
    try {
        const { phone, open, close, long, lati, cost } = req.body;
        // check in charging station exist or not
        const chargingStation = await pool.query("SELECT * FROM charging_station WHERE cs_longitude = $1 AND cs_latitude =$2", [long, lati]);
        if (chargingStation.rows.length << 0) {
            return res.status(400).send("Charging Station Already Exist");
        };

        // // creating constrait from only ONE CHARGING STATION
        const ocs = await pool.query("SELECT cs_status FROM users WHERE user_id =$1", [req.user]);
        csStatus = ocs.rows[0].cs_status;
        // console.log(csStatus);
        if (csStatus == true) {
            return res.status(400).send("YOU CAN ONLY ADD ONE CHARGING STATION.");
        };

        // inserting in database    
        const newCS = await pool.query("INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [phone, open, close, long, lati, cost, req.user]);
        const oc = await pool.query("UPDATE users SET cs_status = true WHERE user_id = $1 RETURNING *", [req.user])
        res.json(newCS.rows);
        console.log("created charging station");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});

// to get charging station idd=(uuid)
router.get("/cs_id/:id", csIdReturn, async (req, res) => {
    try {
        //check whether CS exsist or not
        const csExist = await pool.query("SELECT * FROM charging_station WHERE user_ID =$1", [req.user]);
        if (csExist.rows.length === 0) {
            return res.status(401).json("YOU HAVE NO CHARGING STATION ADDED");
        };
        const csID = await pool.query("SELECT cs_id FROM charging_station WHERE user_id =$1", [req.user]);
        res.json(csID.rows[0].cs_id);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});

//verifying charging station
router.get("/verifycs/:id", csIdReturn, async (req, res) => {
    try {
        //check whether CS exsist or not
        const csExist = await pool.query("SELECT * FROM charging_station WHERE cs_id =$1", [req.csid]);

        if (csExist.rows.length === 0) {
            return res.status(401).json("CHARGIND STATION DOESNT EXSIST or invalid input");
        };

        const csVerify = await pool.query("UPDATE charging_station SET cs_verification = true WHERE cs_id = $1 RETURNING cs_id,cs_verification", [req.csid]);
        res.json(csVerify.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});

// get all charging station data
router.get("/csall", async (req, res) => {
    try {
        const getAllCS = await pool.query("SELECT * FROM charging_station");
        res.send(getAllCS.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});

// get data of charging station added by said cs id 
router.get("/csdata/:id", csIdReturn, async (req, res) => {
    try {
        const cs = await pool.query("SELECT * FROM charging_station WHERE cs_id = $1", [req.csid]);
        // console.log(cs.rows);
        res.json(cs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});

// update charging station
router.put("/csdata/:id", csIdReturn, async (req, res) => {
    try {
        const { phone, open, close, long, lati, cost } = req.body;
        // check in charging station exist or not
        const checkCS = await pool.query("SELECT * FROM charging_station WHERE cs_id = $1", [req.csid]);
        if (checkCS.rows.length === 0) {
            return res.status(400).send("Charging Station DOESNT Exist");
        };
        // check in charging station exist or not
        // const chargingStation = await pool.query("SELECT * FROM charging_station WHERE cs_longitude = $1 AND cs_latitude =$2", [long, lati]);
        // if (chargingStation.rows.length << 0) {
        //     return res.status(400).send("Charging Station Already Exist");
        // };
        const updateCs = await pool.query("UPDATE charging_station SET cs_phone = $1 ,cs_openat = $2 , cs_closeat = $3 , cs_longitude = $4 , cs_latitude =$5 , cs_cost =$6 WHERE cs_id = $7 RETURNING * ", [phone, open, close, long, lati, cost, req.csid]);
        res.json(updateCs.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});

//delete the cs by id
router.delete("/deletecs/:id", csIdReturn, async (req, res) => {
    try {
        const deleteCS = await pool.query("DELETE FROM charging_station WHERE cs_id =$1", [req.csid]);
        res.send("DELETED SUCCESSFULLY")

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});
module.exports = router;