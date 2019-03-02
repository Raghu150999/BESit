module.exports.getCleanUser = function (user) {
    let newUser = {
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phoneno: user.phoneno,
        roomno: user.roomno,
        password:user.password
    }
    return newUser;
}