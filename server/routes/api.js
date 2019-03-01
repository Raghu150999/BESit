const router = require('express').Router();
const User = require('../models/userSchema');
const jwtHandler = require('./../auth/token');
const utils = require('./../utils/utils');
const jwt = require('jsonwebtoken');


router.post('/verifyuser', (req, res) => {
    console.log(req.body);
    User.findOne({ username: req.body.username }).then(function (result) {
        if (result)
            req.check('username', 'User already exists').not().equals(result.username);
        req.check('fname', 'First Name missing').notEmpty();
        req.check('lname', 'Last Name missing').notEmpty();
        req.check('email', 'Not a valid email').isEmail();
        req.check('password', 'Password cannot be empty').notEmpty();
        req.check('password', 'Passwords don\'t match').equals(req.body.rpassword);
        req.check('phoneno', 'Phoneno is invalid').isMobilePhone(["en-IN"]);
        User.findOne({email: req.body.email}).then(result => {
            if(result){
                req.check('email', 'Email already in use').not().equals(result.email);
            }
            const errors = req.validationErrors();
            let response;
            if (errors) {
                response = {
                    success: false,
                    errors,
                }
                res.send(response);
            }
            else {
                response = {
                    success: true,
                    errors: null
                }
                User.saveUser(req.body, function (result) {
                    res.send(response);
                });
            }
        });
    });
});


router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }).then(result => {
        let err = false;
        let success = true;
        let cleanUser;
        if(result) {
            if(result.password !== req.body.password) {
                err = true;
                success = false;
            }
            cleanUser = utils.getCleanUser(result);
        }
        else {
            err = true;
            success = false;
        }
        
        const response = {
            success: success,
            error: err,
            msg: 'Invalid username or password',
            user: cleanUser,
            token: null
        };
        if(err === false) {
            let token = jwtHandler.generateToken(result);
            response.token = token;
            console.log(token);
        }
        res.send(response);
    });
});

router.get('/authorize', (req, res) => {
    let token = req.query.token;
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if(err) throw err;
        User.findOne({ username: user.username }).then(result => {
            let response;
            if(result) {
                user = utils.getCleanUser(user);
                response = {
                    user,
                    success: true
                }
            }
            else {
                response = {
                    user: null,
                    success: false
                }
            }
            res.json(response);
        });
    });
});

const Product = require('./../models/productSchema');

router.post('/additem', (req, res) => {
    const product = new Product({
        ...req.body.formData
    });
    product.save().then(() => {
        Product.find({}).then(result => {
            res.send(result);
        });
    });
});

router.get('/getitems', (req, res) => {
    Product.find({}).then(result => {
        res.send(result);
    });
});

module.exports = router;