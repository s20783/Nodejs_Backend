const express = require('express');
const router = express.Router();
const authUtils = require('../util/AuthUtils');
const isAuth = require('../middleware/isAuth');

const zawodnicyController = require('../controllers/ZawodnicyController');
router.get('/api', zawodnicyController.showZawodnicyList2);
router.get('/api/details/:zawodnikID', zawodnicyController.showZawodnicyDetails2);
router.get('/api/:zawodnikID', zawodnicyController.showZawodnicyInfo2);
router.post('/api/add', isAuth, zawodnicyController.zawodnicyAdd2);
router.put('/api/edit/:zawodnikID', isAuth, zawodnicyController.zawodnicyEdit2);
router.delete('/api/delete/:zawodnikID', isAuth, zawodnicyController.zawodnicyDelete2);


router.get('/', zawodnicyController.showZawodnicyList);
router.get('/details/:zawodnikID', zawodnicyController.showZawodnicyDetails);
router.get('/edit/:zawodnikID', authUtils.permitAuthenticatedUser, zawodnicyController.showZawodnikEdit);
router.get('/add', authUtils.permitAuthenticatedUser, zawodnicyController.showZawodnikAdd);
router.post('/add', authUtils.permitAuthenticatedUser, zawodnicyController.zawodnicyAdd);
router.post('/edit', authUtils.permitAuthenticatedUser, zawodnicyController.zawodnicyEdit);
router.get('/delete/:zawodnikID', authUtils.permitAuthenticatedUser, zawodnicyController.zawodnicyDelete);

module.exports = router;