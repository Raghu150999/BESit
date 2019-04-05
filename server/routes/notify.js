const router = require('express').Router();
const Notification = require('./../models/notificationSchema');


router.post('/interest', (req, res) => {
	const data = req.body;
	const notification = new Notification({
		...data
	});
	Notification.findOne({
		productID: data.productID,
		type: data.type,
		sourceUsername: data.sourceUsername
	}).then(result => {
		if (!result) {
			// If no notification is present already
			if (data.status === 'Interested') {
				notification.save().then(result => {
				});
			}
		} else {
			// Remove the notification if already present
			if (data.status === 'Not Interested') {
				Notification.findOneAndDelete({
					productID: data.productID,
					type: data.type,
					sourceUsername: data.sourceUsername
				}).then(result => {
				});
			}
		}
		res.send('ok');
	})
});

router.get('/notifications', (req, res) => {
	const username = req.query.username;
	Notification.find({ targetUsername: username })
		.then(result => {
			res.send(result.reverse());
		});
})

router.get('/seen', (req, res) => {
	const username = req.query.username;
	Notification.updateMany(
		{ targetUsername: username },
		{ seenStatus: true }, (err, result) => {
		});
	res.send('ok');
})	

module.exports = router;