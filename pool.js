const util = require('util');
const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});



pool.getConnection((err, connection) => {
    if (err) {
        console.log("Error al conectar");
        console.log(err);
    }
    if (connection) {
        console.log("mySQL conectado")
        connection.release();
    }
    return;
})

pool.query = util.promisify(pool.query);

module.exports = pool;