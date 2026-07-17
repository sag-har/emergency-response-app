const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql } = require("../config/db");

const buildAuthToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET || "SUPER_SECRET_KEY_123",
    {
      expiresIn: "7d",
    }
  );
};

// ===================== REGISTER =====================

const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!/^\d{11}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 11 digits.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Check if phone already exists
    const existingUser = await sql.query`
      SELECT *
      FROM dbo.Users
      WHERE PhoneNumber = ${cleanPhone}
    `;

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user (UserID is IDENTITY)
    await sql.query`
      INSERT INTO dbo.Users
      (
        FullName,
        Email,
        PhoneNumber,
        PasswordHash,
        Role,
        CreatedAt
      )
      VALUES
      (
        ${cleanName},
        ${""},
        ${cleanPhone},
        ${hashedPassword},
        ${"Citizen"},
        GETDATE()
      )
    `;

    // Fetch inserted user
    const result = await sql.query`
      SELECT TOP 1 *
      FROM dbo.Users
      WHERE PhoneNumber = ${cleanPhone}
      ORDER BY UserID DESC
    `;

    const createdUser = result.recordset[0];

    const user = {
      id: createdUser.UserID,
      name: createdUser.FullName,
      phone: createdUser.PhoneNumber,
      email: createdUser.Email,
      role: createdUser.Role,
    };

    const token = buildAuthToken(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user,
    });

  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===================== LOGIN =====================

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and password are required.",
      });
    }

    const cleanPhone = phone.trim();

    const result = await sql.query`
      SELECT *
      FROM dbo.Users
      WHERE PhoneNumber = ${cleanPhone}
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password.",
      });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(
      password,
      user.PasswordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password.",
      });
    }

    const responseUser = {
      id: user.UserID,
      name: user.FullName,
      phone: user.PhoneNumber,
      email: user.Email,
      role: user.Role,
    };

    const token = buildAuthToken(responseUser);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: responseUser,
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};