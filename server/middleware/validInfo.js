module.exports = function (req, res, next){
    const{email, firstname, lastname, phone, password} =  req.body;
    function validEmail(userEmail){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    };
    function validPhone(phoneNo){
        return /^[6-9]\d{9}$/.test(phoneNo);
    };

    if(req.path === "/auth/signup"){
        console.log(!email.length);
        if (![email,firstname,lastname,phone,password].every(Boolean)){
            return res.status(401).json("missing Email password phone no. or name");
        }else if (!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }else if (!validPhone(phone)){
            return res.status(401).json("Invalid Phone no.")
        };
    } else if (req.path=== "/auth/signin"){
        if(![email,password].every(Boolean)){
            return res.status(401).json("Please Enter email and password");
        }else if ( !validEmail(email)){
            return res.status(401).json("Invalid Email");
        };
    };
    next();
};
