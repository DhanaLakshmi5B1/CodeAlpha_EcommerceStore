const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/api/orders', async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "Order Placed Successfully" });
});

module.exports = router;
