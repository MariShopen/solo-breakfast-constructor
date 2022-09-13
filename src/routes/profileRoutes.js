const express = require('express');

const router = express.Router();

const { renderProfile, getDuck } = require('../controllers/profileControllers');

router
  .get('/profile', renderProfile)
  .get('/profile/img', getDuck);

module.exports = router;
