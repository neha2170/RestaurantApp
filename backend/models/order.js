const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  items: { type: Array, required: true },
  total_price: { type: Number, required: true },
  is_cash: { type: Boolean, require: true, default: true},
  status: { 
    type: String, 
    enum: ['PENDING', 'SERVED', 'DONE'], 
    default: 'Pending' 
  },

});

module.exports = mongoose.model('order', orderSchema);
