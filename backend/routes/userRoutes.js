const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkCookieToken } = require('../middlewares/httpAuthMiddleware');

router.get('/', checkCookieToken, userController.getAllUsers);
router.get('/profile/:id', checkCookieToken, userController.getProfile);
router.get('/profile/edit/:id', checkCookieToken, userController.getEditProfile);
router.put('/profile/edit/:id', checkCookieToken, userController.postEditProfile);

module.exports = router;
