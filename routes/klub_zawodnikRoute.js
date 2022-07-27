const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const klub_zawodnikController = require('../controllers/Klub_ZawodnikController');
router.get('/api', klub_zawodnikController.showKlub_ZawodnikList2);
router.get('/api/details/:klubID/:zawodnikID', klub_zawodnikController.showKlub_ZawodnikDetails2);
router.get('/api/edit/:klubZawodnikID', klub_zawodnikController.showKlub_ZawodnikEdit2);
router.get('/api/add', klub_zawodnikController.showKlub_ZawodnikAdd2);
router.post('/api/add', isAuth, klub_zawodnikController.klub_ZawodnikAdd2);
router.put('/api/edit/:klubZawodnikID', isAuth, klub_zawodnikController.klub_ZawodnikEdit2);
router.delete('/api/delete/:klubZawodnikID', isAuth, klub_zawodnikController.klub_ZawodnikDelete2);


router.get('/', klub_zawodnikController.showKlub_ZawodnikList);
router.get('/details/:klubID/:zawodnikID', klub_zawodnikController.showKlub_ZawodnikDetails);
router.get('/edit/:klubZawodnikID', klub_zawodnikController.showKlub_ZawodnikEdit);
router.get('/add', klub_zawodnikController.showKlub_ZawodnikAdd);
router.post('/add', klub_zawodnikController.klub_ZawodnikAdd);
router.post('/edit', klub_zawodnikController.klub_ZawodnikEdit);
router.get('/delete/:klubZawodnikID', klub_zawodnikController.klub_ZawodnikDelete);


module.exports = router;