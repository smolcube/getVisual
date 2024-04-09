const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  designer: {
    type: Schema.Types.ObjectId,
    ref: 'Designer',
    required: true
  },
  package: {
    type: Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  payMethod: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
},
{
  timestamps: true 
}
);
module.exports = mongoose.model('Order', orderSchema);
