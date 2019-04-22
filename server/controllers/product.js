const Product = require('../models/product');

class Controller {
  static all(req, res) {
    Product.find({})
      .then(products => {
        if (products.length === 0) {
          res.status(404).json({ message: 'data empty', products })
        } else {
          res.status(200).json({ message: 'data found', products });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
  
  static one(req, res) {
    Product.findById(req.params.id)
      .then(product => {
        if (!product) {
          res.status(404).json({ message: 'not found', product });
        } else {
          res.status(200).json({ message: 'found', product });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static create(req, res) {
    Product.create({
      name: req.body.name,
      image: req.file && req.file.cloudStoragePublicUrl || null,
      price: req.body.price,
      stock: req.body.stock,
    })
      .then(newProduct => {
        res.status(201).json({ message: 'successfully created', newProduct });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
  
  static update(req, res) {
    let updatedProduct = null;
    Product.findById(req.params.id)
      .then(product => {
        if (!product) {
          res.status(404).json({ message: 'not found to update', product });
        } else {
          updatedProduct = product;
          updatedProduct.name = req.body.name || product.name;
          updatedProduct.image = req.file && req.file.cloudStoragePublicUrl || product.image;
          updatedProduct.price = req.body.price || product.price;
          updatedProduct.stock = req.body.stock || product.stock;
          return product.updateOne({
            name: req.body.name || product.name,
            image: req.file && req.file.cloudStoragePublicUrl || product.image,
            price: req.body.price || product.price,
            stock: req.body.stock || product.stock,
          })
        }
      })
      .then(info => {
        res.status(200).json({ message: 'successfully updated', updatedProduct, info });
      })  
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static delete(req, res) {
    let deletedProduct = null;
    Product.findById(req.params.id)
      .then(product => {
        if (!product) {
          res.status(200).json({ message: 'not found to delete', product });
        } else {
          deletedProduct = product;
          return product.delete()
        }
      })
      .then(() => {
        res.status(200).json({ message: 'successfully deleted', deletedProduct});
      })  
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
}


module.exports = Controller;