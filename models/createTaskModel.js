const mongoose = require('mongoose');

function createTaskModel(email) {
    const connection = mongoose.createConnection(`mongodb+srv://shengjih0722:mongodb@cluster0.evqkt3s.mongodb.net/test/${email}`);
    const TaskSchema = new mongoose.Schema({
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
    return connection.model('Task', TaskSchema);
}

module.exports = createTaskModel;
