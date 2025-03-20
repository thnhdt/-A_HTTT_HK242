const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  address: String,
  phone_num: String,
  email: String
});

module.exports = mongoose.model('User', UserSchema);