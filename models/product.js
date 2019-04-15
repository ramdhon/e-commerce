const mongoose = require('mongoose');

let { Schema } = mongoose;

let productSchema = new Schema({
  name: String,
})

let Product = mongoose.model('Product', productSchema);


module.exports = Product;