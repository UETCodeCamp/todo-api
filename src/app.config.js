const Confidence = require('confidence');

const config = {
    secretKey: '_uet_code_camp_',
    port: {
        $filter: "env",
        $default: 5001,
        staging: 5002,
        production: 5001
    },
    mongodb: {
        $filter: "env",
        $default: 'mongodb://localhost:27017/todo_app',
        staging: 'mongodb://localhost:27017/todo_app_dev',
        production: 'mongodb://localhost:27017/todo_app',
    }
};

const store = new Confidence.Store(config);
const criteria = {
    env: process.env.NODE_ENV || 'development'
};

module.exports.get = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue;
};

module.exports.meta = function (key) {
    return store.meta(key, criteria);
};