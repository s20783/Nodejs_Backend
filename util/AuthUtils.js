const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passwordPlain) => {
    const passwordHashed = bcrypt.hashSync(passwordPlain, salt);
    return passwordHashed;
}

exports.comparePasswords = (passwordPlain, passwordHashed) => {
    const res = bcrypt.compareSync(passwordPlain, passwordHashed);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser) {
        next();
    } else {
        throw new Error('Ta akcja wymaga logowania');
    }
}