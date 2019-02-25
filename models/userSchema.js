let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    email: String,
    password: String,
    loggedIn: {
        type: Boolean,
        default: false
    }
});

let User = mongoose.model('users', userSchema);

module.exports = User;

module.exports.saveUser = function (data, done) {
    let user = new User({
        username: data.username,
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        loggedIn: false
    });
    User.findOne({ username: data.username }).then(function (result) {
        if (result === null) {
            user.save().then(function () {
                done(true);
            });
        }
        else {
            done(false);
        }
    });
}


module.exports.logIn = function (username, done) {
    User.findOne({username: username}).then(result => {
        if(result) {
            User.findOneAndUpdate({username: username}, {loggedIn: true}).then(res => {
                done(true);
            });
        }
        else {
            done(false);
        }
    });
}

module.exports.logOut = function (username, done) {
    User.findOne({ username: username }).then(result => {
        if (result) {
            User.findOneAndUpdate({ username: username }, { loggedIn: false }).then(result => {
                done(true);
            });
        }
        else {
            done(false);
        }
    });
}

module.exports.checkStatus = function (username, done) {
    User.findOne({ username: username }).then(result => {
        if(result) {
            return result.loggedIn;
        }
        else {
            return null;
        }
    });
}

