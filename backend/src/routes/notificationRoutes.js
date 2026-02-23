const express = require('express');
const { listNotifications, scheduleNotification } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', listNotifications);
router.post('/schedule', scheduleNotification);

module.exports = router;
