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
    fileNames: Array,
    interestedUsers: Array
});

let Product = mongoose.model('products', productSchema);

const db = mongoose.connection;
const collection = db.collection('products');

// Creating text index for search
collection.createIndex({ 
    name: "text",
    desc: "text"
});


module.exports = Product;
