const express = require('express');
const { listTasks, completeTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/', listTasks);
router.post('/:id/complete', completeTask);

module.exports = router;
