const express = require('express');
const router = express.Router();

// const checkAuth = require('../middlewares/check-auth');

const handlingRecordsControllers = require('../controllers/handling-controller');

// router.use(checkAuth);

router.get('/', handlingRecordsControllers.getHandlingRecords);

router.get('/:id', handlingRecordsControllers.getHandlingRecordByID);

router.post('/', handlingRecordsControllers.createHandlingRecord);

router.put('/:id', handlingRecordsControllers.updateHandlingRecord);

router.delete('/:id', handlingRecordsControllers.deleteHandlingRecord);

module.exports = router;
