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

app.post('/api/water_amount',async (req, res) => {
  // Data sent to this endpoint: { amount: 200 }
  const data = req.body;
  const result = await knex('amount_of_water').insert(data);
  res.json({message: 'success'});
});

app.listen( process.env.PORT || '4000', () => {
  console.log('Server is running on port 4000!');
});