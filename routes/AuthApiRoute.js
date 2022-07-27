const express = require('express');
const router = express.Router();

const apiAuthController = require('../controllers/AuthControllerApi');

router.post('/login', apiAuthController.login);

module.exports = router;