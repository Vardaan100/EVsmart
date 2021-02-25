const express = require("express");
const app = express();
const port = 3000 ; 
const cors = require("cors");
const pool = require("./db");
app.get("/api",(req,res)=>{
    res.send("hello EvSmartapi")
});
app.use(cors());//middleware
app.use(express.json());

 // Routes
app.use("/api/dashboard",require("./routes/dashboard"))
app.use("/api/auth",require("./routes/auth")) //auth route
app.get("/",(req,res)=>{
    res.send("hello EvSmart")
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
