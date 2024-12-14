const db = require('../database/db');

const renderContactPage = (req, res) => {
    const sql = 'SELECT * FROM contact_messages ORDER BY timestamp DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contact messages:', err);
            return res.status(500).send('Error fetching contact messages');
        }
        res.render('contact', {
            layout: 'layouts/layout',
            title: 'Contact',
            showNavbar: true,
            showFooter: true,
            contactMessages: results,
        });
    });
};

const submitContactForm = (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error submitting contact form:', err);
            return res.status(500).send('Error submitting contact form');
        }
        res.redirect('/contact'); 
    });
};

const getContactMessages = (req, res) => {
    const sql = 'SELECT * FROM contact_messages ORDER BY timestamp DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contact messages:', err);
            return res.status(500).send('Error fetching contact messages');
        }
        res.render('contact-messages', {
            layout: 'layouts/layout',
            title: 'Contact Messages',
            messages: results,
            showNavbar: true,
            showFooter: true,
        });
    });
};

module.exports = {
    renderContactPage,
    submitContactForm,
    getContactMessages,
};
