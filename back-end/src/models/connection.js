const pg = require('pg')
require('dotenv').config();

const connection = new pg.Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE
})

module.exports = connection;


