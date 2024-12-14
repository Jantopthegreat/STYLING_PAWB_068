const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { isSignedIn } = require('../middlewares/middleware');

router.get('/', isSignedIn, todoController.getTodos);
router.post('/add', isSignedIn, todoController.addTodo);
router.post('/:id/done', isSignedIn, todoController.markTodoAsDone);
router.post('/:id/delete', isSignedIn, todoController.deleteTodo);
router.post('/edit/:id', isSignedIn, todoController.editTodo);

module.exports = router;
