const User = require("../models/userModel");

const verifyEmailLogin = async (db, email) => {

    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Users WHERE email = ?', [email], (err, user) => {
            if (err) {
                reject(err);
            } else {
                if (!user) {
                    reject(new Error('Email does not exist in the system.'));
                } else {
                    resolve(user);
                }
            }
        });
    });
}

module.exports = {
    verifyEmailLogin
};