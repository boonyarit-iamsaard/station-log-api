const express = require('express');
const router = express.Router();

const db = require('../models');
const HandlingRecord = db.handlingRecord;

const handlingControllers = require('../controllers/handling.controller');

// GET /api/handling
router.get('/', handlingControllers.findAll);

// GET /api/handling/:id
router.get('/:id', getHandlingRecord, handlingControllers.findOne);

// POST /api/handling
router.post('/', handlingControllers.create);

// PUT /api/handling/:id
router.put('/:id', handlingControllers.update);

// DELETE /api/handling/:id
router.delete('/:id', getHandlingRecord, handlingControllers.delete);

// Middleware
async function getHandlingRecord(req, res, next) {
  let handlingRecord;

  try {
    handlingRecord = await HandlingRecord.findById(req.params.id);

    if (handlingRecord == null) {
      return res.status(404).json({ message: 'Handling record not found.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.handlingRecord = handlingRecord;

  next();
}

module.exports = router;
