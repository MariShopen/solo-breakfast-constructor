const express = require('express');

const router = express.Router();

const { logoutUser } = require('../controllers/logoutControllers');

router
  .get('/logout', logoutUser);

module.exports = router;
