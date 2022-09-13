require('dotenv').config();

const path = require('path');
const express = require('express');
// const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { sequelize } = require('../db/models');

const app = express();

// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'https://api.edamam.com/api/recipes/v2',
//   ],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   credentials: true,
// };

// app.use(cors(corsOptions));

app.use(morgan('dev'));
// Чтобы наши статические файлы были видны браузеру, мы должны их подключить
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRoutes = require('./routes/indexRoutes');
const breakfastRoutes = require('./routes/breakfastRoutes');
const loginRoutes = require('./routes/loginRoutes');
const regRoutes = require('./routes/regRoutes');
const profileRoutes = require('./routes/profileRoutes');
const logoutRoutes = require('./routes/logoutRoutes');

// Выносим порт в .env и на всякий случай подставляем дефолтный через ||
const { PORT, SESSION_SECRET } = process.env;

const sessionConfig = {
  name: 'userCookie', // * Название куки
  store: new FileStore(), // * подключение стора (БД для куки) для хранения
  secret: SESSION_SECRET ?? 'your key', // * ключ для шифрования куки
  resave: false, // * если true, пересохраняет сессию, даже если она не поменялась
  saveUninitialized: false, // * Если false, куки появляются только при установке req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10, // * время жизни в ms (10 дней)
    httpOnly: true, // * куки только по http
  },
};

app.use(session(sessionConfig));

app.use('/', indexRoutes);
app.use('/', loginRoutes);
app.use('/', regRoutes);
app.use('/', logoutRoutes);
app.use('/', breakfastRoutes);
app.use('/', profileRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой установлено!');
  } catch (err) {
    console.log(err, 'Error!');
  }
  console.log(`Сервер поднят на ${PORT} порту!`);
});
