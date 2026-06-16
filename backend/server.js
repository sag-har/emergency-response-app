const express = require('express');
const cors = require('cors');

// Windows folder structure (authRoute.js aur emergencyRoute.js) ke mutabiq sahi paths:
const authRoutes = require('./src/routes/authRoute');
const emergencyRoutes = require('./src/routes/emergencyRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    app: 'Friendsware Emergency App API',
    version: '1.0.0 - Week 2 (Phase 1)',
    endpoints: {
      auth: '/api/auth',
      emergency: '/api/emergency',
    },
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/emergency', emergencyRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ success: false, message: 'An unexpected server error occurred.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚑 Emergency App API running on port ${PORT}`);
  console.log(`📋 Auth: POST /api/auth/register | POST /api/auth/login | GET /api/auth/me`);
  console.log(`🆘 Emergency: POST /api/emergency | GET /api/emergency | GET /api/emergency/:id`);
  console.log(`📍 Location: GET /api/emergency/:id/location\n`);
});

module.exports = app;