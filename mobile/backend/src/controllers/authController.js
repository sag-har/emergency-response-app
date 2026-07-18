const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { sql } = require("../config/db");

if (!process.env.JWT_SECRET) {
  console.warn(
    "⚠️  JWT_SECRET is not set in the environment. Falling back to a dev-only default. " +
    "Anyone who knows this default can forge valid tokens — set JWT_SECRET in .env before deploying."
  );
}

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY_123";

const buildAuthToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ===================== REGISTER =====================

const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    // Check if phone already exists
    const existingUser = await sql.query`
      SELECT * FROM dbo.users WHERE phone_number = ${cleanPhone}
    `;

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ success: false, message: "Phone number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // Insert user
    await sql.query`
      INSERT INTO dbo.users (id, full_name, phone_number, password_hash)
      VALUES (${userId}, ${cleanName}, ${cleanPhone}, ${hashedPassword})
    `;

    const user = {
      id: userId,
      name: cleanName,
      phone: cleanPhone,
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
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ===================== LOGIN =====================

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ success: false, message: "Phone and password are required." });
    }

    const cleanPhone = phone.trim();

    const result = await sql.query`
      SELECT * FROM dbo.users WHERE phone_number = ${cleanPhone}
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid phone number or password." });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid phone number or password." });
    }

    const responseUser = {
      id: user.id,
      name: user.full_name,
      phone: user.phone_number,
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
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
