const { verify } = require("jsonwebtoken");

validInfo = (req, res, next)=>{
    const{email, name , password, type} =  req.body;

    function validEmail(userEmail){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(userEmail);
    };

    if(req.path === "/auth/signup"){
        if (![email,name,password,type].every(Boolean)){
            return res.status(401).json("missing Email password or name");
        }else if (!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }
    }
    else if (req.path=== "/auth/signin"){
        if(![email,password].every(Boolean)){
            return res.status(401).json("Please Enter email and password");
        }else if ( !validEmail(email)){
            return res.status(401).json("Invalid Email");
        };
    };
    next();
}

module.exports = validInfo