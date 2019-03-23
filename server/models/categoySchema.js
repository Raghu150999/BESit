let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema({
	name: String
});

let Category = mongoose.model('categories', categorySchema);

module.exports = Category;




