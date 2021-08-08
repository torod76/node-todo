const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    description: String,
    date: { type: Date, default: Date.now },
    isDone: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;