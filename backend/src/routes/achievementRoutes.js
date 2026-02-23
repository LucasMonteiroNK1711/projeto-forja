const express = require('express');
const { listAchievements } = require('../controllers/achievementController');

const router = express.Router();

router.get('/', listAchievements);

module.exports = router;
