const mongoose = require('mongoose');

const GlobalTaskSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdate: {
        type: Date,
        default: Date.now
    },
    modifydate: {
        type: Date,
        default: Date.now
    },
    publisher: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: false
    },
    type: {
        type: Array,
        required: false,
        default: []
    },
    constraints: {
        type: String,
        required: false
    },
    reward: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('GlobalTask', GlobalTaskSchema);