// Reusable functions

const bcrypt = require('bcryptjs');

// @desc Check password conditions
const isPasswordValid = (password) => {
  // Password policy regular expression
   /* At least one uppercase letter
      At least one lowercase letter
      At least one digit
      At least one special character among @$!%*?&
      Minimum total length of 8 characters */

// Check password against specified conditions
    const passwordConditions = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordConditions.test(password);
};

// @desc Hashing password
const passwordHashing = (password) =>{
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    return hashedPass;
};

module.exports = {
    passwordHashing,
    isPasswordValid,
}