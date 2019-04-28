const jwt = require('jsonwebtoken');

module.exports.generateToken = function (user) {
    let u = {
        username: user.username,
        fname: user.fname,
        phoneno:user.phoneno,
        password:user.password
    };
    return token = jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}
