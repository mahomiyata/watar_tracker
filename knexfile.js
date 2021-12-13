require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { user: process.env.DB_USER , database: 'water_tracker' }
};