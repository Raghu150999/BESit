const router = require('express').Router();
const User = require('../models/userSchema');


router.post('/verifyUser', (req, res) => {
    User.findOne({username: req.body.username}).then(function (result) {
        console.log(result);
        console.log(req.body);
        if (result)
            req.check('username', 'User already exists').not().equals(result.username);
        req.check('fname', 'First Name missing').notEmpty();
        req.check('lname', 'Last Name missing').notEmpty();
        req.check('email', 'Not a valid email').isEmail();
        req.check('password', 'Password cannot be empty').notEmpty();
        req.check('password', 'Passwords don\'t match').equals(req.body.rpassword);
        const errors = req.validationErrors();
        let response;
        if(errors){
            response = {
                success: false,
                errors,
            }
        }
        else{
            response = {
                success: true,
                errors: null
            }
        }
        console.log(errors);
        res.send(response);
    });
    
})

module.exports = router;