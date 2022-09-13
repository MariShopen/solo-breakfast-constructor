// const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

const renderTemplate = require('../../lib/renderTemplate');
const Profile = require('../views/Profile');

const { User, Favorite } = require('../../db/models');

const renderProfile = async (req, res) => {
  const newUser = req.session?.newUser;
  const user = await User.findOne({ where: { login: newUser } });
  const favsUser = await User.findAll({
    where: { login: newUser },
    include: Favorite,
  });

  const favs = favsUser[0].Favorites;
  console.log('favs', favs);
  console.log('favs[0]Favorites', favs[0].Favorites);


  renderTemplate(Profile, { newUser, user, favs }, res);
};

const getDuck = async (req, res) => {
  // console.log('заходим в ручку');
  try {
    const url = 'https://random-d.uk/api/v2/random';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, options);
    const duck = await response.json();

    const newUser = req.session?.newUser;

    // console.log('newUser from profileControllers', newUser);
    // console.log('duck from profileControllers', duck.url);
    await User.update({
      img_url: duck.url,
    }, {
      where: { login: newUser },
      returning: true,
      plain: true,
    });

    res.json(duck);
  } catch (error) {
    console.log(error);
    res.send(`Error ------> ${error}`);
  }
};

module.exports = { renderProfile, getDuck };
