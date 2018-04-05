const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const todoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        index: true,
    },
    title: {
        type: String,
        trim: true
    },
    completed: {
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

module.exports = connection.model('Todo', todoSchema);