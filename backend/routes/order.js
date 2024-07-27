const express = require('express');
const router = express.Router();
const {addOrder, getAllOrders, addOrderStatus ,updateOrderStatus, getAllStatus} = require('../controllers/order');
const { authMiddleware } = require('../middlewares/auth');

// Middleware to protect routes
// router.use(authMiddleware);


// Route to get all restaurant
router.get('/all-orders', getAllOrders);

module.exports = router;
