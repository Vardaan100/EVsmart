const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtgenerator");
const verifyInfo = require("../middleware/validInfo");
const authorization = require("../middleware/verifyAuth");
const userDataToken = require("../middleware/tokenReturn");

const jwt = require("jsonwebtoken");
require("dotenv").config()



//signup andd register

router.post("/signup",verifyInfo,async (req,res)=>{
    try {
        const{firstname, lastname, phone , email , password}  = req.body;//structing

        // check if user exsist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        // res.json(user.rows)
        if(user.rows.length<<0){
            return res.status(401).send("user exist");
        };
        //check if phone no. exsist
        const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1",[phone]);
        if(phone_no.rows.length<<0){
            return res.status(401).send("Phone no. in use");
        }
        //bcrypting password
        const saltRound = 9 ;//no. of time to bcrypt password
        const Salt = bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password,saltRound)//will ecrylic password 9 times

        // adding user to the database (storing database)
        const newUser = await pool.query("INSERT INTO users(user_firstname,user_lastname,user_phone, user_email, user_password) VALUES ($1,$2,$3,$4,$5) RETURNING user_firstname,user_lastname,user_phone, user_email",[firstname,lastname,phone,email,bcryptPassword]);
        
        //generating jwtoken
        const token = jwtGenerator(newUser.rows[0].user_email);
        // const token = jwtGenerator(newUser.rows[0].user_id);
        var nr = newUser.rows;
        // nr.token = JSON.stringify(token);
        res.json(nr);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
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

        const token = jwtGenerator(user.rows[0].user_email);
        // const token = jwtGenerator(user.rows[0].user_id);
        res.json(token);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

router.get("/verify",authorization,async(req,res)=>{
    try {
        console.log(req.user)
        // console.log(authorization)
        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});

//getting the user data by token
router.get("/userdata/:id",userDataToken,async (req,res)=>{
    try {
        // console.log(req.user)
        userEmailId = req.user
        // check whether the user id is valid
        const id = await pool.query("SELECT * FROM users WHERE user_email = $1",[userEmailId]);
        
        if(id.rows.length===0){
            return res.status(401).send("INVALID ID");
        };
        const userData = await pool.query("SELECT user_firstname,user_lastname,user_email,user_phone FROM users WHERE user_email = $1",[userEmailId])
        res.json(userData.rows)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
})

//updting the user data
router.put("/userdata/:id",verifyInfo,userDataToken,async (req,res)=>{
    try {
        const{firstname, lastname, phone , password}  = req.body;
        //check if phone no. exsist
        const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1",[phone]);
        if(phone_no.rows.length<<0){
            return res.status(401).send("Phone no. in use");
        }
        console.log(req.user)
        userEmailId = req.user
        console.log(userEmailId)
        //bcrypting password
        const saltRound = 9 ;//no. of time to bcrypt password
        const Salt = bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password,saltRound)

        const updateUser = await pool.query("UPDATE users SET user_firstname=$1,user_lastname=$2,user_phone=$3,user_password=$4 WHERE user_email=$5 RETURNING user_firstname,user_lastname,user_email,user_phone",[firstname, lastname, phone , bcryptPassword, req.user])
        res.json(updateUser.rows)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
})
// for user verification
router.put("/userVerification",async (req,res)=>{
    try {
        // console.log("hi")
        const {email} = req.body;
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
        res.status(500).send("server error");
    };
})

module.exports = router ;