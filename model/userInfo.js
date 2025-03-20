const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true
  },
  address: String,
  phone_num: String,
  email: String
});

module.exports = mongoose.model('Info', InfoSchema);

  