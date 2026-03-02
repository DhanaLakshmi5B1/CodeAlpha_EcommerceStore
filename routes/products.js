const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// =============================
// 🔹 HOME PAGE - Show All Products
// =============================
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('index', { products });
    } catch (error) {
        res.send("Error loading products");
    }
});


// =============================
// 🔹 ADD PRODUCT PAGE (Frontend Form)
// =============================
router.get('/add-product', (req, res) => {
    res.render('add-product');
});


// =============================
// 🔹 ADD PRODUCT (POST)
// =============================
router.post('/add-product', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect('/');
    } catch (error) {
        res.send("Error adding product");
    }
});


// =============================
// 🔹 PRODUCT DETAILS PAGE
// =============================
router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('product-details', { product });
    } catch (error) {
        res.send("Product not found");
    }
});


module.exports = router;
