const bcrypt = require('bcryptjs');
const db = require('../database/db');

const renderSignUpPage = (req, res) => {
    res.render('signup', {
        title: 'Sign Up'
    });
};

const renderSignInPage = (req, res) => {
    res.render('signin', {
        title: 'Sign In'
    });
};

const signUpUser = (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('Error checking for existing user');
        }

        if (results.length > 0) {
            return res.status(400).send('Username already exists');
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Bcrypt Error:', err);
                return res.status(500).send('Error hashing password');
            }

            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(query, [username, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Database Error:', err);
                    return res.status(500).send('Error saving user');
                }

                res.redirect('/signin');
            });
        });
    });
};

const signInUser = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('Error fetching user');
        }

        if (results.length === 0) {
            console.log('User not found:', username);
            return res.status(400).send('User not found');
        }

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                console.error('Bcrypt Error:', err);
                return res.status(500).send('Error checking password');
            }

            if (!isMatch) {
                console.log('Incorrect password for user:', username);
                return res.status(401).send('Incorrect password');
            }

            req.session.user = results[0].id;
            console.log('SignIn successful, user set to:', req.session.user);

            res.redirect('/');
        });
    });
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during session destruction:', err);
            return res.status(500).send('Error logging out');
        }

        res.redirect('/signin');
    });
};

module.exports = {
    renderSignUpPage,
    renderSignInPage,
    signUpUser,
    signInUser,
    logoutUser
};
