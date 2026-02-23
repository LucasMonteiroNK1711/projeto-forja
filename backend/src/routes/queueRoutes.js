const express = require('express');
const { dispatchNotifications } = require('../controllers/queueController');

const router = express.Router();

router.post('/dispatch-notifications', dispatchNotifications);

module.exports = router;
