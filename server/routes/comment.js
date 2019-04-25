const router = require('express').Router();
const Comment = require('./../models/commentSchema');

router.post('/addcomment', (req, res) => {
	let comment = new Comment({
		...req.body
	});
	comment.save().then(() => {
		res.send(comment);
	})
});

router.get('/getcomments', (req, res) => {
	Comment.find({itemID: req.query.id})
		.then(result => {
			res.send(result);
		})
});

router.post('/deletecomment', (req, res) => {
	let id = req.body.id;
	Comment.findOneAndDelete({_id: id})
		.then(result => {
			res.send('ok');
		});
})

module.exports = router;