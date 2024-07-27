const Order = require('../models/order');
const Status = require("../models/status");
const axios = require('axios');


// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    const payloads = [];
    if (req.query.status && req.query.is_cash) {
      payloads.push({ status: req.query.status, is_cash: req.query.is_cash === 'true' });
    } else {
      payloads.push({ status: "PENDING", is_cash: true });
      payloads.push({ status: "SERVED", is_cash: true });
    }
    const orders = await Promise.all(
      payloads.map(async payload => {
        const response = await axios.post('https://test-api.achilyon.in/v1/orders/all-orders', payload, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          }
        });
        return response.data;
      })
    );

    // Flatten the array if needed (if the API returns arrays of orders)
    const flattenedOrders = orders.flat();

    res.json(flattenedOrders[0]);
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};

// // Get all orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const filters = {};
//     if (req.query.status) {
//       filters.status = req.query.status;
//     }
//     if (req.query.is_cash) {
//       filters.is_cash = req.query.is_cash;
//     }
//     const orders = await Order.find(filters);
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };