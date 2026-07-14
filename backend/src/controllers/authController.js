const bcrypt = require("bcryptjs");
const { sql } = require("../config/db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    // 🔥 Strict validation taake khali ya undefined strings DB tak na jayein
    if (!name || !phone || !password || phone.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "All fields are required and cannot be empty",
      });
    }

    const cleanPhone = phone.trim();

    // 1. Column matched with DB structure 'phone_number'
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

    // 2. Insert clean data explicitly
    await sql.query`
      INSERT INTO [users]
      (id, full_name, phone_number, password_hash)
      VALUES
      (${userId}, ${name.trim()}, ${cleanPhone}, ${hashedPassword})
    `;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
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

    // 3. Explicitly fetching using cleaned string
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

    // 4. Verification using database snake_case keys
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

    // 5. JWT payload updated to use exact database properties
    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone_number,
      },
      process.env.JWT_SECRET || "SUPER_SECRET_KEY_123",
      {
        expiresIn: "7d",
      }
    );

    // 6. Response properties aligned with database response keys
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        phone: user.phone_number,
      },
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