const Todo = require('../models/TodoModel');

module.exports = (app) => {
    
    const Task = [];

    app.get('/todo/api/v1/tasks'), (req, res) => {
        Todo.create(Task, (result) => {
            res.send(result);
        });
        app.get('/todo/api/v1/tasks/'), (req, res) =>{
            Todo.create(Task, (result) =>{
                res.send(result);
            })
        }
    };
};