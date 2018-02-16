const JWT = require('jsonwebtoken');
const appConfig = require('../app.config');

exports.isAuthorized = (token) => {
    if (token) {
        const secretKey = appConfig.get('/secretKey');

        return new Promise((resolve, reject) => {
            JWT.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return reject(new Error('Failed to authenticate token.'));
                } else {
                    return resolve(decoded);
                }
            });
        });
    } else {
        return Promise.reject(new Error('No token provided.'));
    }
};

exports.signUp = ({email, name}) => {

};

exports.signIn = ({email, password}) => {

};