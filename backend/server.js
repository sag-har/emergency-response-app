const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");

// Load Environment Configuration
dotenv.config();

const app = express();

// Standard Middlewares
app.use(cors());
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});
app.use(express.json());

// Route Integrations
const healthRoutes = require("./src/routes/healthRoutes");
const authRoutes = require("./src/routes/authRoutes");
const testRoutes = require("./src/routes/testRoutes");
const emergencyRoutes = require("./src/routes/emergencyRoutes"); 

// Mounting API Endpoints cleanly
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

// =======================================================
// WEEK 5, 6 & 7 CLEAN ROUTING (TRACK B - MEMBER C)
// =======================================================
// Prefix ko sirf "/api" par set kiya hai taake routes clean banein
app.use("/api", emergencyRoutes); 

const PORT = process.env.PORT || 5000;

// Async function to guarantee DB connects before Express binds the port
const startServer = async () => {
  try {
    // 1. Initialize Database Instance
    await connectDB();

    // 2. Start Listening globally (Keeps the process active & running)
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running globally on port ${PORT}`);
      console.log(`📌 Week 7 - Status Change Push Notification Endpoints are live and ready!`); 
    });
  } catch (error) {
    console.error("❌ Failed to start infrastructure server:", error);
    process.exit(1);
  }
};

startServer();