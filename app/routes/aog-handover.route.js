// noinspection DuplicatedCode

const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');

const aogHandoverController = require('../controllers/aog-handover.controller');

router.use(checkAuth);

router.get('/', aogHandoverController.findAll);

router.get('/:id', aogHandoverController.findOne);

router.post('/', aogHandoverController.create);

router.put('/:id', aogHandoverController.update);

router.delete('/:id', aogHandoverController.deleteOne);

module.exports = router;
