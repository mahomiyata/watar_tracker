const express = require('express');
const morgan = require('morgan')
const path = require('path');

const app = express();

// Logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));

// static resources
app.use(express.static(path.join(__dirname, '../dist/')));

app.listen( process.env.PORT || '4000', () => {
  console.log('Server is running on port 4000!');
});