const api = require('./api');
const expressValidator = require('express-validator');
const router = require('express').Router()

router.use('/api', expressValidator(), api)

module.exports = router;