const bcrypt = require("bcryptjs");
const { sql } = require("../config/db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const buildAuthToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone,
    },
    process.env.JWT_SECRET || "SUPER_SECRET_KEY_123",
    {
      expiresIn: "7d",
    }
  );
};

const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password || name.trim() === "" || phone.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "All fields are required and cannot be empty",
      });
    }

    const cleanPhone = phone.trim();
    const cleanName = name.trim();

    if (!/^\d{11}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 11 digits",
      });
    }

    if (password.trim().length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await sql.query`
      SELECT * FROM [users]
      WHERE phone_number = ${cleanPhone}
    `;

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Phone already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const userId = crypto.randomUUID();

    await sql.query`
      INSERT INTO [users]
      (id, full_name, phone_number, password_hash)
      VALUES
      (${userId}, ${cleanName}, ${cleanPhone}, ${hashedPassword})
    `;

    const user = {
      id: userId,
      name: cleanName,
      phone: cleanPhone,
    };
    const token = buildAuthToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {
    console.error("Registration DB Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password || phone.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Phone and password are required",
      });
    }

    const cleanPhone = phone.trim();

    const result = await sql.query`
      SELECT * FROM [users]
      WHERE phone_number = ${cleanPhone}
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(
      password.trim(),
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const responseUser = {
      id: user.id,
      name: user.full_name,
      phone: user.phone_number,
    };
    const token = buildAuthToken(responseUser);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: responseUser,
    });

  } catch (error) {
    console.error("Login DB Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
