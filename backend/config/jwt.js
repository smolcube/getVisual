
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// Generate a Toke (JWT)
function generateJWTToken(payload, expiresIn) {
  
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  
  return token;
}

module.exports = generateJWTToken;
