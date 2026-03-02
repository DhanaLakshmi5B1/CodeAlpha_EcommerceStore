const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

let cartItems = [];

router.get('/cart', (req, res) => {
    res.render('cart', { cartItems });
});

router.get('/add-to-cart/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    cartItems.push(product);
    res.redirect('/cart');
});

module.exports = router;
