const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const userSchema = new Schema({
    email: {
        type: String,
        index: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    }
});

module.exports = connection.model('User', userSchema);