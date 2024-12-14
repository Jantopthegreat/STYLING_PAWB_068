const db = require('../database/db');

const getTodos = (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.status(401).send('Unauthorized');
    }

    const sql = 'SELECT * FROM todos WHERE user_id = ?';
    db.query(sql, [user], (err, results) => {
        if (err) {
            console.error('Error fetching todos:', err);
            return res.status(500).send('Error fetching todos');
        }
        res.render('todos', {
            layout: 'layouts/layout',
            title: 'Todos',
            todos: results,
            showNavbar: true,
            showFooter: true,
        });
    });
};

const addTodo = (req, res) => {
    const { title, description } = req.body;
    const user = req.session.user;

    if (!user) {
        return res.status(401).send('Unauthorized');
    }

    const sql = 'INSERT INTO todos (title, description, user_id) VALUES (?, ?, ?)';
    db.query(sql, [title, description, user], (err, result) => {
        if (err) {
            console.error('Error adding todo:', err);
            return res.status(500).send('Error adding todo');
        }
        res.redirect('/todos');
    });
};

const markTodoAsDone = (req, res) => {
    const { id } = req.params;

    const sql = 'UPDATE todos SET is_done = 1 WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error marking todo as done:', err);
            return res.status(500).send('Error marking todo as done');
        }
        res.redirect('/todos');
    });
};

const deleteTodo = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM todos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting todo:', err);
            return res.status(500).send('Error deleting todo');
        }
        res.redirect('/todos');
    });
};

const editTodo = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const sql = 'UPDATE todos SET title = ?, description = ? WHERE id = ?';
    db.query(sql, [title, description, id], (err, result) => {
        if (err) {
            console.error('Error editing todo:', err);
            return res.status(500).send('Error editing todo');
        }
        res.redirect('/todos');
    });
};

module.exports = {
    getTodos,
    addTodo,
    markTodoAsDone,
    deleteTodo,
    editTodo,
};