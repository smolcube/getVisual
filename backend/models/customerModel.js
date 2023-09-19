const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  // Define fields Customer here
  username: { type: String,
              required: [true, 'Please add a username'] },

  email: { type: String,
           unique: true,
           required: [true, 'Please add an email'] },

  verified: { type: Boolean,
              default: false,
              required: [true] },
              
  password: { type: String,
              required: [true, 'Please enter a password'] },

  accType: { type: String,
             enum: ['customer'], required: true },
}, 
{
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

