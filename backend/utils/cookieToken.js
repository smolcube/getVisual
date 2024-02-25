const cookie = require('cookie');

const cookieToken = async(req, res, name, jwtToken, age, path) => {

   // Store the passwordResetToken in a cookie and set its expiration time
   const optCookie = cookie.serialize(name, jwtToken, {
    maxAge: age, // 24hr in milliseconds
    path: path, // Set the cookie path to match your reset password route
    httpOnly: true, // Make the cookie accessible only via HTTP
    sameSite: "strict",
  });

  // Attach the registerToken cookie to the response
  res.cookie(name, jwtToken, { maxAge: age, path: path, httpOnly: true, sameSite: "strict" });
}

module.exports = {
    cookieToken,
}
