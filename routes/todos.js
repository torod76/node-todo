require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const TodoFactory = require('../factories/todo.factory');
const Todo = require('../schemas/todo');

router.get('/', (req, res) => {
    TodoFactory.getTodos()
        .then((todos) => {
            res.send(JSON.stringify(todos));
        })
        .catch((err) => {
            res.send(JSON.stringify(err));
        })
});

router.get('/:id', (req, res) => {
    TodoFactory.getTodo(req.params.id)
        .then((todo) => {
            res.send(JSON.stringify(todo));
        })
        .catch((err) => {
            res.send(JSON.stringify(err));
        })
});

router.post('/', (req, res) => {
    const schema = Joi.object({
        description: Joi.string().required()
    });
    const {error} = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    TodoFactory.addTodo(req.body.description)
        .then((todo) => {
            res.send(JSON.stringify(todo));
        })
        .catch((err) => {
            res.send(JSON.stringify(err));
        })
});

router.put('/:id', (req, res) => {
    const schema = Joi.object({
        description: Joi.string().required(),
        isDone: Joi.boolean().required()
    });
    const {error} = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    TodoFactory.updateTodo(req.params.id, req.body.description, req.body.isDone)
        .then((todo) => {
            res.send(JSON.stringify(todo));
        })
        .catch((err) => {
            res.send(JSON.stringify(err));
        })
});

router.delete('/:id', (req, res) => {
    TodoFactory.deleteTodo(req.params.id)
        .then((todo) => {
            res.send(JSON.stringify(todo));
        })
        .catch((err) => {
            res.send(JSON.stringify(err));
        })
});

module.exports = router;
