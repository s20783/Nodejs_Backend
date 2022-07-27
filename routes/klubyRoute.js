const express = require('express');
const router = express.Router();
const authUtils = require('../util/AuthUtils');
const isAuth = require('../middleware/isAuth');

const klubyController = require('../controllers/KlubyController');
router.get('/api', klubyController.showKlubyList2);
router.get('/api/details/:klubID', klubyController.showKlubDetails2);
router.get('/api/:klubID', klubyController.showKlubInfo2);
router.post('/api/add', isAuth, klubyController.klubyAdd2);
router.put('/api/edit/:klubID', isAuth, klubyController.klubyEdit2);
router.delete('/api/delete/:klubID', isAuth, klubyController.klubyDelete2);


router.get('/', klubyController.showKlubyList);
router.get('/details/:klubID', klubyController.showKlubDetails);
router.get('/edit/:klubID', authUtils.permitAuthenticatedUser, klubyController.showKlubyEdit);
router.get('/add', authUtils.permitAuthenticatedUser, klubyController.showKlubyAdd);
router.post('/add', authUtils.permitAuthenticatedUser, klubyController.klubyAdd);
router.post('/edit', authUtils.permitAuthenticatedUser, klubyController.klubyEdit);
router.get('/delete/:klubID', authUtils.permitAuthenticatedUser, klubyController.klubyDelete);

module.exports = router;