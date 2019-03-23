const api = require('./api');
const expressValidator = require('express-validator');
const router = require('express').Router()
const admin = require('./admin');
const search = require('./search');

router.use('/api', expressValidator(), api)
router.use('/admin', admin);
router.use('/search', search);

module.exports = router;