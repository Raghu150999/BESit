const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: String,
    name: String,
    owner: String,
    price: Number,
    desc: String,
    rating: String,
    timestamp: Date, 
    status: String,
    imageIsAvailable: Boolean,
    fileNames: Array
});

let Product = mongoose.model('products', productSchema);

module.exports = Product;
