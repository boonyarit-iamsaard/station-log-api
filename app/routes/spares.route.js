const express = require('express');
const router = express.Router();

const db = require('../models');
const Spare = db.spare;

const sparesControllers = require('../controllers/spare.controller');

// GET /api/spares
router.get('/', sparesControllers.findAll);

// GET /api/spares/:id
router.get('/:id', getSpare, sparesControllers.findOne);

// POST /api/spares
router.post('/', sparesControllers.create);

// PUT /api/spares/:id
router.put('/:id', sparesControllers.update);

// DELETE /api/spares/:id
router.delete('/:id', getSpare, sparesControllers.delete);

// Middleware
async function getSpare(req, res, next) {
  let spare;

  try {
    spare = await Spare.findById(req.params.id);

    if (spare == null) {
      return res.status(404).json({ message: 'Spare not found.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.spare = spare;

  next();
}

module.exports = router;
