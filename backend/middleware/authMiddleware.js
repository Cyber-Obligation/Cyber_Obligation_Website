// authMiddleware.js
const admin = require('../config/firebase-config');

const authorizeFirebaseToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Store decoded user info in request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authorizeFirebaseToken;