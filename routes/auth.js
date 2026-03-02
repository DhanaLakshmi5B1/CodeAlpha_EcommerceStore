const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Register User
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.send("Error registering user");
    }
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.send("User not found");
        }

        if (user.password !== req.body.password) {
            return res.send("Wrong password");
        }

        res.redirect('/');
    } catch (error) {
        res.send("Login error");
    }
});

module.exports = router;
