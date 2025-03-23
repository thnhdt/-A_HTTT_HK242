const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true,
    unique: true
  },
  first_name:
  {
    type: String,
    require: true
  },
  last_name:
  {
    type: String,
    require: true
  },
  email:
  {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Info', InfoSchema);

  