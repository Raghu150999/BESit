let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// maybe each model is like a table here having schema
let userSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    email: String,
    password: String,
    phoneno: Number,
    roomno: String
}); //this should be formant of any inputted data into database
// creating model (table) with this schema
let User = mongoose.model('users', userSchema);
// User is name of thiss database part where as users is name stored in real database 
module.exports = User;
// saving user function is also exported
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
    // find one is default function for any model
    // finds anyone previously with that user name existing or not
    User.findOne({ username: data.username })
        .then(function (result) {
            if (result === null) {
                user.save()
                .then(function () {
                    done(true);
                });
            }
            else {
                done(false);
            }
    });
}


