const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const userService = require('../services/userService');
const fieldService = require('../services/fieldService');
const { validationResult } = require('express-validator');

// Function to handle user registration
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user already exists
        let user = await userService.findUser({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).json([{ message: 'User already exists' }]);
        }


        user = await userService.createUser(req.body);

        // Generate JWT token
        const token = generateToken({ id: user.id, firstName: user.firstName, email: user.email });

        res.cookie('token', token, { httpOnly: true });

        return res.status(201).json({ token });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json([{ message: error.message ? error.message : 'Server Error' }]);
    }
};

// Function to handle user login
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user exists
        let user = await userService.findUser({ where: { email: req.body.email } });
        if (!user) {
            return res.status(400).json([{ message: 'Invalid credentials' }]);
        }

        // Validate password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ id: user.id, firstName: user.firstName, email: user.email });
        res.cookie('token', token, { httpOnly: true });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};


exports.showRegister = async (req, res) => {
    try {
        const professions = await fieldService.getAllFields();

        return res.render('register', { title: 'Register', professions });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal Server Error');
    }

};

exports.logout = (req, res) => {
    // Clear the token or session
    res.clearCookie('token'); // Clear the token cookie
    res.locals.user = null;
    // Redirect to the login page
    return res.redirect('/login');
};
