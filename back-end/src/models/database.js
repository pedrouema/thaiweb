const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE
})

pool.on('connect', () => { console.log('Base de Dados conectado com sucesso!'); });

module.exports = {
    query: (text, params) => pool.query(text, params),
};