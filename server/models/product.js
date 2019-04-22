const mongoose = require('mongoose');

let { Schema } = mongoose;

let productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'required']
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'required']
  },
  stock: {
    type: Number,
    required: [true, 'required']
  }
})

let Product = mongoose.model('Product', productSchema);


module.exports = Product;