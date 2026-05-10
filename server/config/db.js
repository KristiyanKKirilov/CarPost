const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(config.dbURL)
  .then(() => {
    console.log(config.dbURL);
  })
  .catch(() => console.log('No succes'));
};
