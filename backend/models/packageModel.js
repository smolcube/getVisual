
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  images: [{
    type: String, // Accept an array of strings for images
    required: true
  }],
  tags: {
    type: [String],
    required: true
  },
  state: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
});
const Package = mongoose.model('Package', packageSchema);
module.exports = Package;
