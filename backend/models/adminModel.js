const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
    role:{
      type: String,
      required: true,
      enum: ['admin']
  }
},{
timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
