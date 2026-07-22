require("dotenv").config();
const sql = require("mssql");

const config = {
<<<<<<< Updated upstream
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
=======
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "admin123!",
  //
  server: process.env.DB_SERVER || "127.0.0.1", 
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_DATABASE || "EmergencyAppDB",
>>>>>>> Stashed changes
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  instanceName: "SQLEXPRESS",
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("🚀 SQL Server Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);
  }
};

module.exports = {
  sql,
  connectDB,
};