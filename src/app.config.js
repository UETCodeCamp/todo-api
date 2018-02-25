const Confidence = require('confidence');

const config = {
    secretKey: process.env.UCC_SECRET_KEY || '_uet_code_camp_',
    jwt: {
        $filter: "env",
        $default: {
            key: '_uet_code_camp_',
            expires: '7 days'
        },
        staging: {
            key: process.env.UCC_SECRET_KEY || '_uet_code_camp_',
            expires: '7 days'
        },
        production: {
            key: process.env.UCC_SECRET_KEY || '_uet_code_camp_',
            expires: '7 days'
        }
    },
    port: {
        $filter: "env",
        $default: 5001,
        staging: process.env.UUC_PORT_APP || process.env.PORT || 5002,
        production: process.env.UUC_PORT_APP || process.env.PORT || 5001
    },
    mongodb: {
        $filter: "env",
        $default: 'mongodb://localhost:27017/todo_app',
        staging: process.env.UUC_MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_app_dev',
        production: process.env.UUC_MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_app',
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