const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String, 
        minlength:5,
    },
    description: {
        type: String, 
        default: " ",
    },
    completed: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        updated_at: Date.now,
    }
});

mongoose.model('Task', taskSchema);
var Task = mongoose.model('Task');
module.exports = Task;
