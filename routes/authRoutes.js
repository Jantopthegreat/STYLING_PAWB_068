const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/middleware');
const authController = require('../controllers/authController');

// Routes untuk Register
router.get('/signup', authController.renderSignUpPage);
router.post('/signup', authController.signUpUser);

// Routes untuk Login
router.get('/signin', authController.renderSignInPage);
router.post('/signin', authController.signInUser);

router.get('/logout', authController.logoutUser);

router.get('/', isSignedIn, (req, res) => {
    res.render('index', {
        layout: 'layouts/layout',
        title: 'Home',
        showNavbar: true,
        showFooter: true,
    });
});

module.exports = router;
