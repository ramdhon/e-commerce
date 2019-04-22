const Cart = require('../models/cart');
const jwt = require('../helpers/jwt');

class Controller {
  static all(req, res) {
    Cart.find({})
      .populate('customer')
      .populate('products')
      .then(carts => {
        if (carts.length === 0) {
          res.status(404).json({ message: 'data empty', carts })
        } else {
          res.status(200).json({ message: 'data found', carts });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
  
  static one(req, res) {
    Cart.findById(req.params.id)
      .populate('customer')
      .populate('products')
      .then(cart => {
        if (!cart) {
          res.status(404).json({ message: 'not found', cart });
        } else {
          res.status(200).json({ message: 'found', cart });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static create(req, res) {
    Cart.create({
      customer: req.body.customer,
      products: req.body.products,
    })
      .then(newCart => {
        res.status(201).json({ message: 'successfully created', newCart });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
  
  static update(req, res) {
    let updatedCart = null;

    Cart.findById(req.params.id)
      .then(cart => {
        if (!cart) {
          res.status(404).json({ message: 'not found to update', cart });
        } else {
          updatedCart = cart;
          updatedCart.customer = req.body.customer || cart.customer;
          updatedCart.products = req.body.products || cart.products;
          return cart.updateOne({
            customer: req.body.customer || cart.customer,
            products: req.body.products || cart.products,
          })
        }
      })
      .then(info => {
        res.status(200).json({ message: 'successfully updated', updatedCart, info });
      })  
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static delete(req, res) {
    let deletedCart = null;

    Cart.findById(req.params.id)
      .then(cart => {
        if (!cart) {
          res.status(200).json({ message: 'not found to delete', cart });
        } else {
          deletedCart = cart;
          return cart.delete()
        }
      })
      .then(() => {
        res.status(200).json({ message: 'successfully deleted', deletedCart});
      })  
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  // authenticated user controller class functions
  static authOne(req, res) {
    let decoded = jwt.verify(req.headers.token);

    Cart.findOne({
      customer: decoded.id,
    })
      .populate('customer')
      .populate('products')
      .then(cart => {
        if (!cart) {
          res.status(404).json({ message: 'not found', cart });
        } else {
          res.status(200).json({ message: 'found', cart });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static authCreate(req, res) {
    let decoded = jwt.verify(req.headers.token);

    Cart.findOne({
      customer: decoded.id
    })
      .then(cart => {
        if (!cart) {
          Cart.create({
            customer: decoded.id,
            products: req.body.products,
          })
            .then(newCart => {
              res.status(201).json({ message: 'successfully created', newCart });
            })
        } else {
          cart.products = [...cart.products, ...req.body.products];
          cart.updateOne({
            products: cart.products,
          })
            .then(info => {
              res.status(200).json({ message: 'successfully updated', cart, info })
            })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
  
  static authUpdate(req, res) {
    let decoded = jwt.verify(req.headers.token);
    let updatedCart = null;

    Cart.findOne({
      customer: decoded.id
    })
      .then(cart => {
        if (!cart) {
          res.status(404).json({ message: 'not found to update', cart });
        } else {
          updatedCart = cart;
          updatedCart.products = req.body.products || cart.products;
          return cart.updateOne({
            products: req.body.products || cart.products,
          })
        }
      })
      .then(info => {
        res.status(200).json({ message: 'successfully updated', updatedCart, info });
      })  
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static authDelete(req, res) {
    let decoded = jwt.verify(req.headers.token);
    let deletedCart = null;

    Cart.findOne({
      customer: decoded.id
    })
      .then(cart => {
        if (!cart) {
          res.status(200).json({ message: 'not found to delete', cart });
        } else {
          deletedCart = cart;
          return cart.delete()
        }
      })
      .then(() => {
        res.status(200).json({ message: 'successfully deleted', deletedCart});
      })  
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
}


module.exports = Controller;