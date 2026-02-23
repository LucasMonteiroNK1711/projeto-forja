const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');

const router = express.Router();

router.get('/:userId', getAnalytics);

module.exports = router;
