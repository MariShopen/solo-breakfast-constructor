const express = require('express');

const router = express.Router();

const { renderLogin, loginUser } = require('../controllers/loginControllers');

router
  .get('/login', renderLogin)
  .post('/login', loginUser);

module.exports = router;
