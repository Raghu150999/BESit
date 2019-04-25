const api = require('./api');
const expressValidator = require('express-validator');
const router = require('express').Router()
const admin = require('./admin');
const search = require('./search');
const notify = require('./notify');
const comment = require('./comment');

router.use('/api', expressValidator(), api)
router.use('/admin', admin);
router.use('/search', search);
router.use('/notify', notify);
router.use('/comment', comment);

module.exports = router;