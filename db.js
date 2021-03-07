// // connect expresss server with Database
const Pool = require("pg").Pool;
const Client = require("pg").Client;
const fs = require('fs');

const config = {
  user:"naman",
  password:"123456789",
  host:"68.183.83.144",
  port:5432,
  database:"evsmart"
};
const client = new Client(config);
client.connect(err => {
  if (err) {
    console.error('error connecting', err.stack);
  } else {
    console.log('connected to DB');
    client.end();
  };
});
const pool = new Pool(config);
module.exports = pool;

// const config = {
//     host: 'evsmartdb-do-user-8728439-0.b.db.ondigitalocean.com',
//     port: 25060,
//     database: 'evsmart',
//     user: 'doadmin',
//     password: 'f2qcwzietuhuewxj',
//     ssl: {
//         rejectUnauthorized: false,
//         ca: fs.readFileSync("./middleware/root.crt").toString()
//         // key  : fs.readFileSync("client-key.pem").toString(),
//         // cert : fs.readFileSync("client-cert.pem").toString(),
//     }

// };
// const client = new Client(config);
// client.connect(err => {
//   if (err) {
//     console.error('error connecting', err.stack);
//   } else {
//     console.log('connected to DB');
//     client.end();
//   };
// });
// const pool = new Pool(config);


// module.exports = pool;