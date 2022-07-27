var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController')
const LangController = require('../controllers/LangController');

process.env.TZ = 'Europe/Amsterdam'

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', navLocation: 'main', loginError: ''});
});
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/changeLang/:lang', LangController.changeLang);

module.exports = router;
