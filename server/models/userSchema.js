let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    email: String,
    password: String,
    phoneno: Number,
    roomno: String
});

let User = mongoose.model('users', userSchema);

module.exports = User;

module.exports.saveUser = function (data, done) {
    console.log(data);
    let user = new User({
        username: data.username,
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        roomno: data.roomno,
        phoneno: data.phoneno
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


