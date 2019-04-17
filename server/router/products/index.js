const express = require('express');
const products = express.Router();
const Product = require('../../models/product.js');

products.get('/', (req, res) => {
  Product.find({})
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json({ err });
    })
})


module.exports = products;