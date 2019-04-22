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

router.post('/interestedUsers', (req, res) => {
	let notifications = req.body;
	notifications.forEach(item => {
		Notification.findOneAndDelete({
			productID: item.productID,
			targetUsername: item.targetUsername,
			type: 'STATUS UPDATE'
		}).then(result => {
			let notification = new Notification({
				...item
			});
			notification.save().then(result => {
			});
		})
	})
	res.send('ok');
});

router.post('/shareContact', (req, res) => {
	let notification = req.body;
	Notification.findOneAndDelete({
		productID: notification.productID,
		targetUsername: notification.targetUsername,
		type: 'SHARE CONTACT'
	}).then(result => {
		if (notification.payload.status) {
			let n = new Notification({
				...notification
			});
			n.save().then(result => {
				res.send('ok');
			});
		} else {
			res.send('ok');
		}
	});
})

module.exports = router;