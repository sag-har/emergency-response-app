const bcrypt = require("bcryptjs");
const { sql } = require("../config/db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // 🔥 Added for generating unique varchar(36) IDs

const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1. Column matched with DB structure 'phone_number'
    const existingUser = await sql.query`
      SELECT * FROM [users]
      WHERE phone_number = ${phone}
    `;

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Phone already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Generate Unique UUID String for your varchar(36) PK column
    const userId = crypto.randomUUID();

    // 2. Insert columns matched to your DB (id, full_name, phone_number, password_hash)
    await sql.query`
      INSERT INTO [users]
      (id, full_name, phone_number, password_hash)
      VALUES
      (${userId}, ${name}, ${phone}, ${hashedPassword})
    `;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and password are required",
      });
    }

    // 3. Column checked from DB 'phone_number'
    const result = await sql.query`
      SELECT * FROM [users]
      WHERE phone_number = ${phone}
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
      password,
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
      process.env.JWT_SECRET,
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
    console.log(error);
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