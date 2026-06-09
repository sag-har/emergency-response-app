const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const healthRoutes = require("./src/routes/healthRoutes");
app.use("/api", healthRoutes);

const PORT = process.env.PORT || 5000;

require("dotenv").config();

const connectDB = require("./src/config/db").connectDB;

connectDB();

const authRoutes = require("./src/routes/authRoutes");

app.use("/api/auth", authRoutes);

const testRoutes = require("./src/routes/testRoutes");

app.use("/api/test", testRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});