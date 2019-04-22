const mongoose = require('mongoose');

let { Schema } = mongoose;

let cartSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

let Cart = mongoose.model('Cart', cartSchema);


module.exports = Cart;