const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const todoDraftSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    complete: {
        type: Boolean,
        default: false,
        index: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = connection.model('TodoDraft', todoDraftSchema);