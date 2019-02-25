const router = require('express').Router();
const User = require('../models/userSchema');


router.post('/verifyuser', (req, res) => {
    User.findOne({ username: req.body.username }).then(function (result) {
        if (result)
            req.check('username', 'User already exists').not().equals(result.username);
        req.check('fname', 'First Name missing').notEmpty();
        req.check('lname', 'Last Name missing').notEmpty();
        req.check('email', 'Not a valid email').isEmail();
        req.check('password', 'Password cannot be empty').notEmpty();
        req.check('password', 'Passwords don\'t match').equals(req.body.rpassword);
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
        let loggedIn = true;
        if(result) {
            if(result.password !== req.body.password) {
                err = true;
                success = false;
            }
        }
        else {
            err = true;
            success = false;
        }
        const response = {
            success: success,
            error: err,
            msg: 'Invalid username or password',
            user: result
        };
        if(err === false)
            User.logIn(result.username, val => {
            });
        res.send(response);
    });
})


module.exports = router;