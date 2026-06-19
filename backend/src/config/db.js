const sql = require("mssql");

const config = {
  user: "sa",
  password: "Admin123@",
  server: "127.0.0.1",
  port: 1433,
  database: "EmergencyResponseDB",

  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("SQL Server Connected");
  } catch (error) {
    console.error("Database Error:", error);
  }
};

module.exports = { sql, connectDB };