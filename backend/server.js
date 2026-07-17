const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");

// ================================
// Load Environment Variables
// ================================
dotenv.config();

const app = express();

// ================================
// Global Middlewares
// ================================
app.use(cors());

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

app.use(express.json());

// ================================
// Import Routes
// ================================
const healthRoutes = require("./src/routes/healthRoutes");
const authRoutes = require("./src/routes/authRoutes");
const testRoutes = require("./src/routes/testRoutes");
const emergencyRoutes = require("./src/routes/emergencyRoutes");
const hospitalRoutes = require("./src/routes/hospitalRoutes");

// ================================
// Register Routes
// ================================

// Health Check
app.use("/api", healthRoutes);

// Authentication
app.use("/api/auth", authRoutes);

// Test APIs
app.use("/api/test", testRoutes);

// Emergency APIs
app.use("/api/emergency", emergencyRoutes);

// Hospital APIs (Week 5)
app.use("/api/hospitals", hospitalRoutes);

// ================================
// 404 Route
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================================
// Global Error Handler
// ================================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ================================
// Server
// ================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server Startup Failed:", error);
    process.exit(1);
  }
};

startServer();