// connect expresss server with Database


const Pool = require("pg").Pool;
const pool = new Pool({
    user:"postgres",
    password:"12345",
    host:"localhost",
    port:5432,
    database:"evsmart"
});
module.exports = pool;