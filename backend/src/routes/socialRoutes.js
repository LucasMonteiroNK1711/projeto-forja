const express = require('express');
const { getRanking, listClans, createClan, joinClan } = require('../controllers/socialController');

const router = express.Router();

router.get('/ranking', getRanking);
router.get('/clans', listClans);
router.post('/clans', createClan);
router.post('/clans/:clanId/join', joinClan);

module.exports = router;
