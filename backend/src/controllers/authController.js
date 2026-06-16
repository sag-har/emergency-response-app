const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { poolPromise, sql } = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { fullName, phoneNumber, password } = req.body;

    if (!fullName || !phoneNumber || !password) {
      return res.status(400).json({ success: false, message: 'Full Name, Phone Number, and Password are required.' });
    }

    if (fullName.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Full Name must be at least 2 characters.' });
    }

    const phoneRegex = /^(\+92|0)3[0-9]{9}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      return res.status(400).json({ success: false, message: 'Enter a valid Pakistani phone number (e.g. 03001234567).' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const pool = await poolPromise;
    
    // Check if phone already registered in SQL Server
    const userCheck = await pool.request()
      .input('phone', sql.VarChar(20), phoneNumber.trim())
      .query('SELECT * FROM users WHERE phone_number = @phone');

    if (userCheck.recordset.length > 0) {
      return res.status(409).json({ success: false, message: 'This phone number is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // SQL Server Insertion
    await pool.request()
      .input('id', sql.VarChar(36), userId)
      .input('name', sql.VarChar(100), fullName.trim())
      .input('phone', sql.VarChar(20), phoneNumber.trim())
      .input('pass', sql.VarChar(255), hashedPassword)
      .query(`
        INSERT INTO users (id, full_name, phone_number, password_hash)
        VALUES (@id, @name, @phone, @pass)
      `);

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,
      user: { id: userId, fullName: fullName.trim(), phoneNumber: phoneNumber.trim() },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ success: false, message: 'Phone Number and Password are required.' });
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('phone', sql.VarChar(20), phoneNumber.trim())
      .query('SELECT * FROM users WHERE phone_number = @phone');

    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid phone number or password.' });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid phone number or password.' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: { id: user.id, fullName: user.full_name, phoneNumber: user.phone_number },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.VarChar(36), req.user.userId)
      .query('SELECT id, full_name, phone_number, created_at FROM users WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const user = result.recordset[0];
    res.status(200).json({
      success: true,
      user: { id: user.id, fullName: user.full_name, phoneNumber: user.phone_number, createdAt: user.created_at },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { register, login, getMe };