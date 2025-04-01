const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const auth_token = require('./verifyToken.js')

module.exports = router;