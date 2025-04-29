const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/token.controller');

router.post('/tokens', TokenController.saveToken);
router.delete('/tokens', TokenController.deleteToken);

module.exports = router;