const express = require("express");
const app = express();
const port = 3000 ; 
const cors = require("cors");
const pool = require("./db");

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/dashboard",require("./routes/dashboard"))

//Auth 
app.use("/api/auth",require("./routes/auth")) 
app.get("/",(req,res)=>{
    res.send("Running auth")
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
