const express = require('express');
const login = express.Router();

const UserController = require('../../controllers/user');

login.post('/', UserController.login);


module.exports = login;