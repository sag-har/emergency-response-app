const sql = require("mssql");

const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "admin123!",
  server: "127.0.0.1", // Isay 127.0.0.1 ya localhost hi rakho taake backend to DB connection na tootay
  port: 1433,
  database: "EmergencyAppDB",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("🚀 SQL Server Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = { sql, connectDB };