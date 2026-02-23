const express = require('express');
const { getSeasons, getClanRanking, listBadges } = require('../controllers/competitiveController');

const router = express.Router();

router.get('/seasons', getSeasons);
router.get('/clan-ranking', getClanRanking);
router.get('/badges', listBadges);

module.exports = router;
