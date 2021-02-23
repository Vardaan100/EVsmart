const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"hellohello",
    host:"localhost",
    port:5432,
    database:"evsmart"
});

module.exports = pool;