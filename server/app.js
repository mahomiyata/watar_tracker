const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const knex = require('./knex');
const apiRoute = require('./api/router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// Logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
  )
);

// static resources
app.use('/', express.static(path.join(__dirname, '../dist/')));
app.use('/api/water_amount', apiRoute);

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

app.post('/signup', async (req, res) => {
  // TODO: 同じメールアドレスが存在していないかのチェック
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
      uuid: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      hashed_password: hashedPassword,
    };
    await knex('users').insert(data);
    res.redirect('/');
  } catch (error) {
    res.status('500').json({ message: `${error} / エラーが発生しました` });
  }
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

module.exports = app;
