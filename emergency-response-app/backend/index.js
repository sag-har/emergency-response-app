const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");

// Load Environment Variables
dotenv.config();

const app = express();

// Global Middlewares
app.use(cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

// Import Routes
const healthRoutes = require("./src/routes/healthRoutes");
const authRoutes = require("./src/routes/authRoutes");
const testRoutes = require("./src/routes/testRoutes");
const emergencyRoutes = require("./src/routes/emergencyRoutes");
const hospitalRoutes = require("./src/routes/hospitalRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");

// Register Routes
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

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

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ Server Startup Failed:", error);
    process.exit(1);
  }
};

startServer();

// Export app for Vercel
module.exports = app;
