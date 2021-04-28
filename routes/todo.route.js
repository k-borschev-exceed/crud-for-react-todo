const express = require('express');
const router = express.Router();

const todo_controller = require('../controllers/todo.controller');

router.post('/', todo_controller.todo_create);
router.get('/', todo_controller.todo_read);
router.patch('/', todo_controller.todo_update);
router.delete('/', todo_controller.todo_delete);

module.exports = router;
