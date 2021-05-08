const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');

const sparesControllers = require('../controllers/spare-controller');

router.use(checkAuth);

router.get('/', sparesControllers.getSpares);

router.get('/:id', sparesControllers.getSpareByID);

router.post('/', sparesControllers.createSpare);

router.put('/:id', sparesControllers.updateSpare);

router.delete('/:id', sparesControllers.deleteSpare);

module.exports = router;
