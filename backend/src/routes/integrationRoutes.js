const express = require('express');
const { listIntegrations, connectIntegration } = require('../controllers/integrationController');

const router = express.Router();

router.get('/', listIntegrations);
router.post('/connect', connectIntegration);

module.exports = router;
