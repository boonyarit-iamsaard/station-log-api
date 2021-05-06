const express = require('express');
const router = express.Router();

const { verifySignUp } = require('../middlewares');

const authControllers = require('../controllers/auth.controller');

router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
  authControllers.signup
);

router.post('/signin', authControllers.signin);

module.exports = router;
