const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.renderContactPage);

router.post('/', contactController.submitContactForm);

router.get('/contact-messages', contactController.getContactMessages);

module.exports = router;
