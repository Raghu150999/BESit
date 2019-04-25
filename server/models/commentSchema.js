let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
	username: String, // person who comments
	text: String, 		// comment content
	itemID: String,   // product/requirement id
	itemName: String, // product/requirement name
	owner: String,    // owner of the product/requirement
	timestamp: Date
});

let Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;

