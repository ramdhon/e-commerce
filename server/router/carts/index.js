const express = require('express');
const carts = express.Router();
const CartController = require('../../controllers/cart');
const authentication = require('../../middlewares/authentication');
const adminAuthor = require('../../middlewares/adminAuthor');

carts.get('/', authentication, adminAuthor, CartController.all);
carts.post('/', authentication, adminAuthor, CartController.create);
carts.get('/:id', authentication, adminAuthor, CartController.one);
carts.put('/:id', authentication, adminAuthor, CartController.update);
carts.patch('/:id', authentication, adminAuthor, CartController.update);
carts.delete('/:id', authentication, adminAuthor, CartController.delete);


module.exports = carts;