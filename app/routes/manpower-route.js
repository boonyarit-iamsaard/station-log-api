// noinspection DuplicatedCode

const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');

const manpowerController = require('../controllers/manpower-controller');

router.use(checkAuth);

router.get('/', manpowerController.getManpowerRecords);

router.get('/:id', manpowerController.getManpowerRecordByID);

router.post('/', manpowerController.createManpowerRecord);

router.put('/:id', manpowerController.updateManpowerRecord);

router.delete('/:id', manpowerController.deleteManpowerRecord);

module.exports = router;
