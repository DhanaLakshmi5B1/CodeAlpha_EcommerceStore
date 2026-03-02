console.log("Correct Server Running");
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerceDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/auth');     
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const apiRoutes = require('./routes/api');

// 🔥 IMPORTANT: Auth first
app.use('/', authRoutes);
app.use('/', orderRoutes);

// Then others
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', apiRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
