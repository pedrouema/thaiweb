const Client = require('pg').Client
require('dotenv').config();

const connection = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE
})


module.exports = connection;

// EXEMPLO SIMPLES
// client.connect();
// client.query("SELECT * FROM thaiweb")
// .then(results => {
//     const resultado = results.rows
//     console.log(resultado)
// })
// .finally(() => client.end());

