const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtgenerator");
const verifyInfo = require("../middleware/validInfo");
const tokenReturn = require("../middleware/verifyAuth");
const jwt = require("jsonwebtoken");
require("dotenv").config()

// router.get("/",(req,res)=>{
//     res.json("hello EvSmart")
// });

//signup andd register

router.post("/signup",verifyInfo,async (req,res)=>{
    try {
        const{firstname, lastname, phone , email , password}  = req.body;//structing

        // check if user exsist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        // res.json(user.rows);
        // console.log(user.rows.length);
        if(user.rows.length<<0){
            return res.status(401).json("USER ALREADY EXSIST");
        };
        //check if phone no. exsist
        const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1",[phone]);
        if(phone_no.rows.length<<0){
            return res.status(401).json("Phone no. in use");
        }
        //bcrypting password
        const saltRound = 9 ;//no. of time to bcrypt password
        const Salt = bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password,saltRound)//will ecrylic password 9 times

        // adding user to the database (storing database)
        const newUser = await pool.query("INSERT INTO users(user_firstname,user_lastname,user_phone, user_email, user_password) VALUES ($1,$2,$3,$4,$5) RETURNING user_firstname,user_lastname,user_phone, user_email",[firstname,lastname,phone,email,bcryptPassword]);
        
        //generating jwtoken
        // const token = jwtGenerator(newUser.rows[0].user_email);
        const token = jwtGenerator(newUser.rows[0].user_id);
        // nr.token = JSON.stringify(token);
        res.json(newUser.rows);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

//login route

router.post("/signin",verifyInfo,async (req,res)=>{
    try {
        //structing
        const{email, password} = req.body;

        //check whether user exsist or not
        const user = await pool.query("SELECT * FROM users WHERE user_email =$1",[email]);

        if(user.rows.length === 0){
            return res.status(401).json("User doesnt exsist");
        };

        // checking password
        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
        // console.log(validPassword)
        if (!validPassword){
            return res.status(401).json("Password or Email is incorrect");
        }
        //jwtoken

        // const token = jwtGenerator(user.rows[0].user_email);
        const token = jwtGenerator(user.rows[0].user_id);
        res.json(token);


    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

router.get("/verify/:id",tokenReturn,async(req,res)=>{
    try {
        // console.log(req.user)
        // console.log(authorization)
        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//getting the user data by token
router.get("/userdata/:id",tokenReturn,async (req,res)=>{
    try {
        // console.log(req.user)
        userID = req.user
        // check whether the user id is valid
        const id = await pool.query("SELECT * FROM users WHERE user_id = $1",[userID]);
        
        if(id.rows.length===0){
            return res.status(401).json("INVALID ID");
        };
        const userData = await pool.query("SELECT user_firstname,user_lastname,user_email,user_phone FROM users WHERE user_id = $1",[userID])
        res.json(userData.rows)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
})

//updting the user data
router.put("/userdata/:id",verifyInfo,tokenReturn,async (req,res)=>{
    try {

        const{firstname, lastname, phone , password}  = req.body;
        //check if phone no. exsist
        // console.log(req.user)
        const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1 AND NOT user_id =$2",[phone , req.user]);
        if(phone_no.rows.length<<0){
            return res.status(401).json("Phone no. in use");
        }
        // console.log(req.user)
        
        //bcrypting password
        const saltRound = 9 ;//no. of time to bcrypt password
        const Salt = bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password,saltRound)

        const updateUser = await pool.query("UPDATE users SET user_firstname=$1,user_lastname=$2,user_phone=$3,user_password=$4 WHERE user_id=$5 RETURNING user_firstname,user_lastname,user_email,user_phone",[firstname, lastname, phone , bcryptPassword, req.user])
        // res.json(updateUser.rows)
        res.json(updateUser.rows)
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
})
// for user verification
router.get("/userVerification/:id",async (req,res)=>{
    try {
        console.log("hi");
        const email = req.params.id;
        // console.log(email)
        //check whether user exsist or not
        const user = await pool.query("SELECT * FROM users WHERE user_email =$1",[email]);

        if(user.rows.length === 0){
            return res.status(401).json("User doesnt exsist");
        };
        const verifyUpdate = await pool.query("UPDATE users SET user_verification = true WHERE user_email = $1 RETURNING user_email,user_verification",[email] );
        res.json(verifyUpdate.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
})

module.exports = router ;