const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { tryLoginRegister } = require('../middlewares/httpAuthMiddleware');

// API
router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);

// WEB
router.get('/login', tryLoginRegister, (req, res) => {
    return res.render('login', { title: 'Login' });
});
router.get('/register', tryLoginRegister,authController.showRegister);
router.get('/logout', authController.logout);

module.exports = router;
