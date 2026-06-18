const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");

// Load Environment Configuration [cite: 83]
dotenv.config();

const app = express();

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Initialize Database Instance
connectDB();

// Route Integrations
const healthRoutes = require("./src/routes/healthRoutes");
const authRoutes = require("./src/routes/authRoutes");
const testRoutes = require("./src/routes/testRoutes");
const emergencyRoutes = require("./src/routes/emergencyRoutes"); // Week 2 core requirement 

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api", emergencyRoutes); // Adds /api/emergency endpoint base [cite: 22]

// server.js ke aakhri hissay ko aise update karo:
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running globally on port ${PORT}`);
});