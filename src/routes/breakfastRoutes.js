const express = require('express');

const router = express.Router();

const { renderOneBreakfast, addToFav, removeFromFav } = require('../controllers/breakfastControllers');

router.get('/breakfast/:id', renderOneBreakfast)
  .get('/breakfast/fav/:id', addToFav)
  .get('/breakfast/fav/remove/:id', removeFromFav);

module.exports = router;
