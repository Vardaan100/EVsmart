const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtgenerator");
const verifyInfo = require("../middleware/validInfo");
const authorization = require("../middleware/verifyAuth");

//signup andd register

router.post("/signup",verifyInfo,async (req,res)=>{
    try {
        const{firstname, lastname, phone , email , password}  = req.body;//structing

        // check if user exsist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
            email
        ]);
        // res.json(user.rows)
        if(user.rows.length<<0){
            return res.status(401).send("user exist");
        };
        //bcrypting password
        const saltRound = 9 ;//no. of time to bcrypt password
        const Salt = bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password,saltRound)//will ecrylic password 9 times

        // adding user to the database (storing database)
        const newUser = await pool.query("INSERT INTO users(user_firstname,user_lastname,user_phone,user_email,user_password) VALUES ($1,$2,$3,$4,$5) RETURNING *",[firstname,lastname,phone,email,bcryptPassword]);

        //generating jwtoken
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token});
        
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

        const token = jwtGenerator(user.rows[0].user_id);
        res.json(token);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

router.get("/verify",authorization,(req,res)=>{
    try {
        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    };
});


module.exports = router ;