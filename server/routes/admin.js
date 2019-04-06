const router = require('express').Router();
const Category = require('./../models/categoySchema');

router.post('/addcategory', (req, res) => {
	let category = new Category({
		name: req.body.name
	});
	console.log(req.body.name);
	category.save({name: req.body.name})
		.then(() => {
			res.send('ok, added');
		});
});

router.get('/getcategories', (req, res) => {
	Category.find().then(result => {
		res.send(result);
	})
});

module.exports = router;