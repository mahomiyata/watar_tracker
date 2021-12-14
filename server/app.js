const express = require('express');
const morgan = require('morgan');
const knex = require('./knex');
const path = require('path');

const app = express();

// Logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(express.json());

// static resources
app.use(express.static(path.join(__dirname, '../dist/')));

// TODO: Delete this endpoint!
app.get('/api/hi',(req,res) => {
  res.send('hello!');
});

app.get('/api/water_amount/this_week', async (req, res) => {
  const today = new Date();
  const from = new Date();
  today.setDate(today.getDate() + 1);
  from.setDate(from.getDate() - 6);
  const result = await knex('amount_of_water').whereBetween('created_at',[from.toDateString(), today.toDateString()]);
  console.log(result);

  // {created_at: 日付, amount: 1500}
  const sumByDay = [];

  for(let i = 0; i < result.length; i++) {
    const date = result[i].created_at;
    date.setHours(date.getHours() + 9);
    const JST = date.toJSON();
    const regex = new RegExp(/T.*?Z/, 'g');
    const JSTday = JST.replace(regex, '');

    let isAdded = false;
    if(sumByDay.length === 0) {
      sumByDay.push({ created_at: JSTday, amount: result[i].amount });
      isAdded = true;
    }

    for(let item of sumByDay ) {
      if(item.created_at === JSTday && !isAdded) {
        item.amount += result[i].amount;
        isAdded = true;
      }
    }

    if(!isAdded) {
      sumByDay.push({ created_at: JSTday, amount: result[i].amount });
    }
  }
  console.log(sumByDay);
  res.json(sumByDay);
});

app.post('/api/water_amount', async (req, res) => {
  // Data sent to this endpoint: { amount: 200 }
  const data = req.body;
  try {
    await knex('amount_of_water').insert(data);
    return res.json(data);
  } catch (error) {
    return res.status(500).send({message: error});
  }
});

module.exports = app;
