const express = require('express');
const router = express.Router();

const task_controller = require('../controllers/task.controller');

router.post('/', task_controller.task_create);
router.get('/', task_controller.task_read);
router.patch('/', task_controller.task_update);
router.delete('/', task_controller.task_delete);

module.exports = router;
