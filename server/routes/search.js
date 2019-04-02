const router = require('express').Router();
const Product = require('./../models/productSchema');

router.post('/', (req, res) => {
	const data = req.body;
	const owneruser = data.user.username;
	const available = 'Available';
	if (data.searchAll) {
		if (data.category === 'Any') {
			Product.find({ owner: { $ne: owneruser }, status: available})
				.then(result => {
					result.reverse();
					res.send(result);
				});
		} 
		else {
			Product.find({ owner: { $ne: owneruser }, category: data.category, status: available })
				.then(result => {
					result.reverse();
					res.send(result);
				})
		}
	}
	else {
		if (data.category === 'Any') {
			Product.find({
				owner: { $ne: owneruser },
				$text: {
					$search: data.searchText
				},
				status: available
			})
				.then(result => {
					res.send(result);
				});
		}
		else {
			Product.find({
				owner: { $ne: owneruser },
				category: data.category, 
				$text: {
					$search: data.searchText
				},
				status: available
			})
				.then(result => {
					res.send(result);
				});
		}
	}
});


module.exports = router;