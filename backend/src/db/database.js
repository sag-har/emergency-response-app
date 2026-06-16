const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE || 'emergency_db',
    options: {
        encrypt: false, // Local installation ke liye false sab se safe hai
        trustServerCertificate: true // Local SSMS connection bypass karne ke liye mandatory hai
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MS SQL Server successfully!');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed! ', err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };