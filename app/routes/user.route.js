const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares');
const userControllers = require('../controllers/user.controller');

router.get('/', userControllers.allAccess);

router.get('/user', [auth.verifyToken], userControllers.userBoard);

router.get(
  '/admin',
  [auth.verifyToken, auth.isAdmin],
  userControllers.adminBoard
);

module.exports = router;
