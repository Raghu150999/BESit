let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    email: String,
    dob: Date,
    password: String
});

let User = mongoose.model('users', userSchema);

module.exports = User;

module.exports.save = function (data, done) {
    mongoose.connect('mongodb://localhost/mydb', {useNewUrlParser: true});
    mongoose.connection.once('open', function () {
        console.log('Connection made to db...');
        let user = new User({
            username: data.username,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            dob: data.dob,
            password: data.password
        });
        User.findOne({ username: data.username }).then(function (result) {
            if (result === null)
            {
                user.save().then(function () {
                    console.log('User Saved in DB');
                    mongoose.connection.close();
                    console.log('Connection was closed');
                    done(true);
                });
            }
            else
            {
                console.log('Multiple Users present couldn\'t save');
                done(false);
            }
        });
    });
}

module.exports.findByUsername = function (username, callback) {
    mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });
    console.log('Connection made to db...');
    mongoose.connection.once('open', function () {
        User.findOne({username: username}).then(function (result) {
            mongoose.connection.close();
            console.log('Connection was closed');
            callback(result);
        });
    });
}

