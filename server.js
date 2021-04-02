const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const pool = require("./db");
const cookieParser = require('cookie-parser');

app.get("/evsmart/api/", (req, res) => {
    res.send("hello EvSmartapi");
});
app.use(cors());//middleware
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/evsmart/api/dashboard", require("./routes/dashboard"));
app.use("/evsmart/api/auth", require("./routes/auth")); //auth route
app.use("/evsmart/api/cs", require("./routes/cs")); //cs route
app.use("/evsmart/api/admin", require("./routes/adminapi")); //admin route
app.use("/evsmart/api/review", require("./routes/review")); //REVIEW route
app.use("/evsmart/api/message", require("./routes/message")); //sms route
app.get("/evsmart/", (req, res) => {
    res.send("hello EvSmart");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});