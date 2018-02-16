const AuthActions = require('../actions/Auth');

exports.isAuthorized = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'];

    AuthActions.isAuthorized(token)
        .then(result => {
            const {id} = result;
            req['userId'] = id;

            next();
        })
        .catch(error => {
            return res.status(403).send({
                success: false,
                message: error.message || ''
            });
        });
};

exports.signUp = (req, res) => {

};

exports.signIn = (req, res) => {

};
