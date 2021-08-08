require('mongoose');
const Todo = require('../schemas/todo');

function getTodos() {
    return new Promise((resolve, reject) => {
        const query = Todo.find();
        query.exec((err, todos) => {
            if (err) {
                return reject({err: 'Cannot get toods'});
            }
            return resolve(todos);
        });
    });
}

function getTodo(id) {
    return new Promise((resolve, reject) => {
        const query = Todo.findById(id);
        query.exec((err, todo) => {
            if (err) {
                return reject({err: `Cannot get todo with id: ${id}`});
            }
            return resolve(todo);
        });
    });
}

function addTodo(description) {
    return new Promise((resolve, reject) => {
        const todo = new Todo({description});
        todo.save((err, todo) => {
            if (err) {
                return reject({err: `Cannot add todo: ${err}`});
            }
            return resolve(todo);
        });

    });
}

function updateTodo(id, description, isDone) {
    return new Promise((resolve, reject) => {
        getTodo(id)
            .then((todo) => {
                todo.set({
                    description,
                    isDone
                });
                todo.save((err, todo) => {
                    if (err) {
                        return reject({err: `Cannot add todo: ${err}`});
                    }
                    return resolve(todo);
                });
            })
            .catch((err) => {
                return resolve(err);
            })
    });
}

function deleteTodo(id) {
    return new Promise((resolve, reject) => {
        getTodo(id)
            .then((originalTodo) => {
                const query = Todo.deleteOne({_id: id});
                query.exec((err) => {
                    if (err) {
                        return reject({err: `Cannot delete todo with id: ${id}`});
                    }
                    return resolve(originalTodo);
                });
            })
            .catch((err) => {
                return resolve(err);
            })
    });
}

module.exports.getTodos = getTodos;
module.exports.getTodo = getTodo;
module.exports.addTodo = addTodo;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
