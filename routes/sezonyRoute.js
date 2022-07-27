const express = require('express');
const router = express.Router();
const authUtils = require('../util/AuthUtils');
const isAuth = require('../middleware/isAuth');

const sezonyController = require('../controllers/SezonyController');
router.get('/api', sezonyController.showSezonyList2);
router.get('/api/details/:sezonID', sezonyController.showSezonyDetails2);
router.get('/api/edit/:sezonID',  sezonyController.showSezonyDetails2);
router.post('/api/add', isAuth, sezonyController.sezonyAdd2);
router.put('/api/edit/:sezonID', isAuth, sezonyController.sezonyEdit2);
router.delete('/api/delete/:sezonID', isAuth, sezonyController.sezonyDelete2);


router.get('/', sezonyController.showSezonyList);
router.get('/edit/:sezonID', authUtils.permitAuthenticatedUser, sezonyController.showSezonyEdit);
router.get('/add', sezonyController.showSezonyAdd);
router.get('/details/:sezonID', sezonyController.showSezonyDetails);
router.post('/edit', authUtils.permitAuthenticatedUser, sezonyController.sezonyEdit);
router.post('/add', sezonyController.sezonyAdd);
router.get('/delete/:sezonID', authUtils.permitAuthenticatedUser, sezonyController.sezonyDelete);

module.exports = router;