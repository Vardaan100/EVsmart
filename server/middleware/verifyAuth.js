const jwt = require("jsonwebtoken");
require("dotenv").config()

verifyLogin = async(req,res,next) => {
    try {
        const jwtToken = req.header("token");
        if(!jwtToken){
            return res.status(403).json("Provide token")
        }
        //verify the tonken input in req 
        const verify = jwt.verify(jwtToken,process.env.jwtSecret);
        // console.log(verify)
        if(!verify){
            return res.status(403).json("NOT AUTHORISED(invalid token");
        };
        req.user = verify.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("NOT AUTHORISED");
    }
}
module.exports = verifyLogin;