const express = require('express');
const morgan = require('morgan');
const knex = require('./knex');
const path = require('path');
const apiRoute = require('./api/router')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')

// Logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));

// static resources
app.use('/',express.static(path.join(__dirname, '../dist/')));
app.use('/api/water_amount', apiRoute);

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
})

app.post('/signup', (req, res) => {
  console.log(req.body)
  res.send('hy!');
})

app.get('/login', (req, res) => {
  res.render('login.ejs');
})



module.exports = app;
