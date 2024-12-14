const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const path = require('path');

const session = require('express-session');
const expressEjsLayouts = require('express-ejs-layouts');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layouts/layout');

app.use('/', authRoutes);
app.use('/todos', todoRoutes);
app.use('/contact', contactRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
