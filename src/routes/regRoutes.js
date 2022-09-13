const express = require('express');

const router = express.Router();

const { renderRegister, regUser } = require('../controllers/regControllers');

router
  .get('/register', renderRegister)
  .post('/register', regUser);

module.exports = router;
