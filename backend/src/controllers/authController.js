const bcrypt = require("bcryptjs");
const { sql } = require("../config/db");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await sql.query`
      SELECT * FROM [User]
      WHERE Phone = ${phone}
    `;

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Phone already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql.query`
      INSERT INTO [User]
      (Name, Phone, PasswordHash)
      VALUES
      (${name}, ${phone}, ${hashedPassword})
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

    const result = await sql.query`
      SELECT * FROM [User]
      WHERE Phone = ${phone}
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
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
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.Id,
        phone: user.Phone,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.Id,
        name: user.Name,
        phone: user.Phone,
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