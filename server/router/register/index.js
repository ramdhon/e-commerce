const express = require('express');
const register = express.Router();

const UserController = require('../../controllers/user');

register.post('/', UserController.register);


module.exports = register;