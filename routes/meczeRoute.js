const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const meczeController = require('../controllers/MeczeController');
router.get('/api', meczeController.showMeczeList2);
router.get('/api/details/:meczID', meczeController.showMeczeDetails2);
router.get('/api/add', meczeController.showMeczeAdd2);
router.get('/api/edit/:meczID', meczeController.showMeczeEdit2);
router.post('/api/add', isAuth, meczeController.meczeAdd2);
router.put('/api/edit/:meczID', isAuth, meczeController.meczeEdit2);
router.delete('/api/delete/:meczID', isAuth, meczeController.meczeDelete2)

router.get('/api/edit/goleUp/:meczID/:zawodnikID', meczeController.goleAdd2);
router.get('/api/edit/goleDown/:meczID/:zawodnikID', meczeController.goleDown2);
router.get('/api/edit/asystyUp/:meczID/:zawodnikID', meczeController.asystyAdd2);
router.get('/api/edit/asystyDown/:meczID/:zawodnikID', meczeController.asystyDown2);



router.get('/', meczeController.showMeczeList);
router.get('/details/:meczID', meczeController.showMeczeDetails);
router.get('/add', meczeController.showMeczeAdd);
router.get('/edit/:meczID', meczeController.showMeczeEdit);
router.post('/add', meczeController.meczeAdd);
router.post('/edit', meczeController.meczeEdit);
router.get('/delete/:meczID', meczeController.meczeDelete);

router.get('/edit/goleUp/:meczID/:zawodnikID', meczeController.goleAdd);
router.get('/edit/goleDown/:meczID/:zawodnikID', meczeController.goleDown);
router.get('/edit/asystyUp/:meczID/:zawodnikID', meczeController.asystyAdd);
router.get('/edit/asystyDown/:meczID/:zawodnikID', meczeController.asystyDown);

module.exports = router;