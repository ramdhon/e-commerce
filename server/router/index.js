const express = require('express');
const router = express.Router();

const register = require('./register'); 
const login = require('./login');
const glogin = require('./glogin');
const products = require('./products');
const carts = require('./carts');

const CartController = require('../controllers/cart');
const authentication = require('../middlewares/authentication');

router.use('/register', register);
router.use('/login', login);
router.use('/glogin', glogin);
router.use('/products', products);
router.use('/carts', carts);

router.get('/user/carts', authentication, CartController.authOne);
router.post('/user/carts', authentication, CartController.authCreate);
router.patch('/user/carts', authentication, CartController.authUpdate);
router.delete('/user/carts', authentication, CartController.authDelete);


module.exports = router;