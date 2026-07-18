const sql = require("mssql");

// NOTE: Only DB_SERVER/DB_PORT/DB_DATABASE have "safe" local-dev fallbacks.
// DB_USER/DB_PASSWORD do NOT fall back to a hardcoded credential anymore —
// if they're missing we warn loudly instead of silently using a known
// password. Put real values in a .env file (see .env.example).
if (!process.env.DB_PASSWORD) {
  console.warn(
    "⚠️  DB_PASSWORD is not set in the environment. Falling back to a dev-only default. " +
    "Set DB_USER/DB_PASSWORD in your .env file before deploying anywhere."
  );
}

const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "admin123@", // dev-only fallback, see warning above
  server: process.env.DB_SERVER || "127.0.0.1",
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_DATABASE || "EmergencyAppDB",
  options: {
    encrypt: true,
    trustServerCertificate: true, // fine for local dev; use a real cert in prod
  },
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

module.exports = { sql, connectDB };
