const cookie = require('cookie');

const cookieToken = async(req, res, name, jwtToken, age, path) => {

   // Store the passwordResetToken in a cookie and set its expiration time
   const optCookie = cookie.serialize(name, jwtToken, {
    maxAge: age, // 24hr in milliseconds
    path: path, // Set the cookie path to match your reset password route
    httpOnly: true, // Make the cookie accessible only via HTTP
  });

  // Attach the registerToken cookie to the response
  res.cookie(name, jwtToken);
}

module.exports = {
    cookieToken,
}