const Todo = require('../models/TodoModel'),
    bodyParser = require('body-parser');

module.exports = app => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    /////   To GET the all Todo Tasks //////

    app.get('/todo/api/v1/tasks', (req, res) => {
        Todo.find({})
        .then((task) => {
            res.send(task);
        })
        .catch(err => { if (err) throw err });
    });

    /////   To GET the Todo Tasks by Id //////
    app.get('/todo/api/v1/tasks/<task_id>', (req, res) => {
if(req.body.task_id){
    Todo.find({})
    .then((task) => {
        res.send(task);
    })
    .catch(err => { if (err) throw err });
}
    });

        /////   to POST and PUT/update a Todo Task   //////

        app.post('/todo/api/v1/tasks', (req, res) => {

            if (req.body.id) {
                Posts.findByIdAndUpdate(req.body.id,
                    {
                        title: req.body.title,
                        description: req.body.description,
                        done: req.body.done    
                    })
                    .then((task) => {
                        res.send(task);
                    })
                    .catch(err => { if (err) throw err });
            } else {
                var newTodo = Todo({
                    title: req.body.title,
                    description: req.body.description,
                    done: req.body.done
                });
    
                newTodo.save().then((task) => {
                    res.send(task);
                })
            };
        });
    

};
/// To Delete From Server
// app.delete('/todo/api/v1/tasks/<task_id>', (req, res) => {
//     Posts.findByIdAndRemove(req.body.id).then(() => {
//         res.send("Success!!");
//     }).catch(err => { if (err) throw err });
// });