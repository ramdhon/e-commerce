const express = require('express');
const products = express.Router();
const ProductController = require('../../controllers/product');
const authentication = require('../../middlewares/authentication');
const adminAuthor = require('../../middlewares/adminAuthor');
const upload = require('../../middlewares/gUpload');

products.get('/', ProductController.all);
products.post('/', authentication, adminAuthor, upload.multer.single('image'), upload.sendUploadToGCS, ProductController.create);
products.get('/:id', ProductController.one);
products.put('/:id', authentication, adminAuthor, upload.multer.single('image'), upload.sendUploadToGCS, ProductController.update);
products.patch('/:id', authentication, adminAuthor, upload.multer.single('image'), upload.sendUploadToGCS, ProductController.update);
products.delete('/:id', authentication, adminAuthor, ProductController.delete);


module.exports = products;