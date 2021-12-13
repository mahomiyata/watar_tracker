const express = require('express');
const path = require('path');

const app = express();

// static resources
app.use(express.static(path.join(__dirname, '../dist/')));

app.listen( process.env.PORT || '4000', () => {
  console.log('Server is running on port 4000!');
});