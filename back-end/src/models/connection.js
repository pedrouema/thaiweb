const Client = require('pg').Client
const client = new Client({
    user: "postgres",
    password: "postgres123",
    host: "localhost",
    port: 5432,
    database: "thaiweb"
})


client.connect();
client.query("SELECT * FROM thaiweb")
.then(results => {
    const resultado = results.rows
    console.log(resultado)
})
.finally(() => client.end());

