module.exports.getCleanUser = function (user) {
    let newUser = {
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        email: user.email
    }
    return newUser;
}