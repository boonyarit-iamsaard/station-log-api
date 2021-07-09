// noinspection DuplicatedCode

const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');

const disinfectionController = require('../controllers/disinfection-controller');

router.use(checkAuth);

router.get('/', disinfectionController.getDisinfectionList);

router.get('/:id', disinfectionController.getDisinfectionByID);

router.post('/', disinfectionController.createDisinfection);

router.put('/:id', disinfectionController.updateDisinfection);

router.delete('/:id', disinfectionController.deleteDisinfection);

module.exports = router;
