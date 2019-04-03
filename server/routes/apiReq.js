const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Requirement = require('../models/reqSchema');


require('dotenv').config();

router.post('/newreq',function(req,res)
{
    Requirement.create(req.body).then(function(requirement)
    {
        res.send('added');
    });
});