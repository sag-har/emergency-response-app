const jwt = require('jsonwebtoken');

// Secret key direct process.env se aayegi jo aapki .env file mein hai
const JWT_SECRET = process.env.JWT_SECRET || 'SagharSuperSecretKey2026';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.',
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Yahan .env waali dynamic key se token verify hoga
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Decoded payload (jis mein userId hai) req.user mein save ho jayega
    req.user = decoded; 
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please login again.',
    });
  }
};

// Ab dono exports properly define hain aur controllers ko mil jayengi
module.exports = { authMiddleware, JWT_SECRET };