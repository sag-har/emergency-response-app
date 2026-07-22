const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");

// Load Environment Configuration
dotenv.config();

const app = express();

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Route Integrations
const healthRoutes = require("./src/routes/healthRoutes");
const authRoutes = require("./src/routes/authRoutes");
const testRoutes = require("./src/routes/testRoutes");
<<<<<<< Updated upstream
const emergencyRoutes = require("./src/routes/emergencyRoutes"); 
=======
const emergencyRoutes = require("./src/routes/emergencyRoutes");
const hospitalRoutes = require("./src/routes/hospitalRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
>>>>>>> Stashed changes

// Mounting API Endpoints cleanly
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
<<<<<<< Updated upstream
app.use("/api/emergency", emergencyRoutes); // Static clean mounting for Week 2 endpoints
=======

// Emergency APIs (All sub-routes handled natively inside the router)
app.use("/api/emergency", emergencyRoutes);

// Hospital APIs
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/notifications", notificationRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});
>>>>>>> Stashed changes

const PORT = process.env.PORT || 5000;

// Async function to guarantee DB connects before Express binds the port
const startServer = async () => {
  try {
    // 1. Initialize Database Instance
    await connectDB();

    // 2. Start Listening globally (Keeps the process active & running)
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running globally on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start infrastructure server:", error);
    process.exit(1);
  }
};

startServer();