
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// Generate a Toke (JWT)
function generateJWTToken(id) {
  const payload = {
    id: id
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24hr' // Token expires after 24 hours
  });

  return token;
}

module.exports = generateJWTToken;
