const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// =============================
// Generate JWT Token
// =============================
const buildToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone_number,
      role: "Citizen",
    },
    process.env.JWT_SECRET || "SUPER_SECRET_KEY_123",
    {
      expiresIn: "7d",
    }
  );
};

// =============================
// Register
// =============================
const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check existing phone
    const existing = await sql.query`
      SELECT *
      FROM users
      WHERE phone_number = ${phone}
    `;

    if (existing.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    await sql.query`
      INSERT INTO users
      (
        id,
        full_name,
        phone_number,
        password_hash,
        created_at
      )
      VALUES
      (
        ${userId},
        ${name},
        ${phone},
        ${hashedPassword},
        GETDATE()
      )
    `;

    const result = await sql.query`
      SELECT *
      FROM users
      WHERE id = ${userId}
    `;

    const user = result.recordset[0];

    const token = buildToken(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        phone: user.phone_number,
      },
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Login
// =============================
const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and password are required.",
      });
    }

    const result = await sql.query`
      SELECT *
      FROM users
      WHERE phone_number = ${phone}
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone or password.",
      });
    }

    const user = result.recordset[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone or password.",
      });
    }

    const token = buildToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        phone: user.phone_number,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Get Profile
// =============================
const getProfile = async (req, res) => {
  try {

    const result = await sql.query`
      SELECT
        id,
        full_name,
        phone_number,
        created_at
      FROM users
      WHERE id = ${req.user.id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = result.recordset[0];

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.full_name,
        phone: user.phone_number,
        role: "Citizen",
        createdAt: user.created_at,
      },
    });

  } catch (err) {
    console.error("PROFILE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};