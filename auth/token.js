const jwt = require('jsonwebtoken');

module.exports.generateToken = function (user) {
    var u = {
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
    };
    return token = jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}
