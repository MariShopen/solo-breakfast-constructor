// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fetch = require('node-fetch');

const renderTemplate = require('../../lib/renderTemplate');
const OneBreakfast = require('../views/OneBreakfast');

const { User, Favorite, FavUser } = require('../../db/models');

async function getFav(recipeDef, userId) {
  let fav = false;

  const favCheck = await Favorite.findOne({ where: { recipeId: recipeDef.id } });
  if (favCheck == null) {
    console.log(`favCheck(recipeId=${recipeDef.id}) == null`);
    return fav;
  }

  const favUserCheck = await FavUser
    .findOne({ where: { UserId: userId, FavoriteId: favCheck.id } });
  if (favUserCheck == null) {
    console.log(`favUserCheck(UserId=${userId}, FavouriteId=${favCheck.id}) == null`);
    return fav;
  }

  fav = true;
  return fav;
}

const renderOneBreakfast = async (req, res) => {
  const newUser = req.session?.newUser;
  const userId = req.session?.userId;

  const apiKey = '3f8c71044afe46a1a3cae029bb6d7832';
  // fetch запрос от сервера
  const { id } = req.params;
  // console.log(id);
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };

  // async await syntax
  try {
    const response = await fetch(url, options);
    // console.log("response--->>>>", response);
    const recipeDef = await response.json();
    // вынуть нужный массив и засунуть в рендер
    const fav = await getFav(recipeDef, userId);

    const recipe = {

      id: recipeDef.id,
      title: recipeDef.title,
      timeOfCook: recipeDef.readyInMinutes,
      servings: recipeDef.servings,
      image: recipeDef.image,
      instructions: recipeDef.instructions,
      analyzedInstructions: recipeDef.analyzedInstructions,
      fav,
    };

    console.log('recipe-->>>> ', recipe);
    renderTemplate(OneBreakfast, { recipe, newUser }, res);
  } catch (err) {
    console.log(err);
  }
};

const addToFav = async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.session?.newUser;
    const user = await User.findOne({ where: { login: newUser } });

    // проверка избранного на наличие в бд
    const checkFav = await Favorite.findOne({ where: { recipeId: id } });
    if (checkFav) {
      await FavUser.create({ UserId: user.id, FavoriteId: checkFav.id });
      res.sendStatus(200);

      // иначе отправляем fetch и добавляем новое избранное
    } else {
      const apiKey = '3f8c71044afe46a1a3cae029bb6d7832';
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      };
      const response = await fetch(url, options);
      const recipe = await response.json();

      const fav = await Favorite.create({
        recipeId: id,
        title: recipe.title,
        servings: recipe.servings,
        timeOfCook: recipe.readyInMinutes,
        image: recipe.image,
        instructions: recipe.instructions,
        fav: true,
      });

      // console.log('fav--->>>', fav);

      await FavUser.create({ UserId: user.id, FavoriteId: fav.id });
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const removeFromFav = async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.session?.newUser;
    const user = await User.findOne({ where: { login: newUser } });
    const fav = await Favorite.findOne({ where: { recipeId: id } });
    await FavUser.destroy({ where: { UserId: user.id, FavoriteId: fav.id } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { renderOneBreakfast, addToFav, removeFromFav };
