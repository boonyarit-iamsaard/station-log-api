const express = require('express');
const router = express.Router();

const handlingRecordsControllers = require('../controllers/handling-controller');

router.get('/', handlingRecordsControllers.getHandlingRecords);

router.get('/:id', handlingRecordsControllers.getHandlingRecordByID);

router.post('/', handlingRecordsControllers.createHandlingRecord);

router.put('/:id', handlingRecordsControllers.updateHandlingRecord);

router.delete('/:id', handlingRecordsControllers.deleteHandlingRecord);

module.exports = router;
