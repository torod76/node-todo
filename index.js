const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const todos = require('./routes/todos');

const app = express();
app.use(express.json());
app.use('/todos', todos);

mongoose.connect('mongodb://localhost/todos')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Cannot connect to MongoDB: ', err));


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Logging enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));