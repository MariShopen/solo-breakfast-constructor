const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

const renderTemplate = require('../../lib/renderTemplate');
const Register = require('../views/Register');

const { User } = require('../../db/models');

const renderRegister = (req, res) => {
  renderTemplate(Register, null, res);
};

const regUser = async (req, res) => {
  const { login, password } = req.body;
  try {
    const find = await User.findOne({ where: { login } });
    if (find) {
      res.send({ user: 'exist' });
    } else {
      const url = 'https://random-d.uk/api/v2/random';
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, options);
      const duck = await response.json();
      // console.log('duck ', duck);

      const hash = await bcrypt.hash((password), 10);
      const newUser = await User.create({ login, password: hash, img_url: duck.url });
      req.session.newUser = newUser.login;
      req.session.userId = newUser.id;
      console.log("req.session.userId---->>>>>", req.session.userId)
      req.session.save(() => {
        res.json({ login: 'ok' });
      });
    }
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
};

module.exports = { renderRegister, regUser };
