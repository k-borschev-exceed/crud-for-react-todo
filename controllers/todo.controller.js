const Todo = require('../models/todo.model');

exports.todo_create = function (req, res, next) {
  let todo = new Todo({
    task: req.body.task,
    isCompleted: req.body.isCompleted,
    key: req.body.key,
  });

  todo.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send('Todo Created successfully');
  });
};

exports.todo_read = function (req, res, next) {
  Todo.find({}, function (err, todos) {
    if (err) return next(err);
    res.send(todos);
  });
};

exports.todo_update = function (req, res, next) {
  if (req.body.hasOwnProperty('task')) {
    Todo.findOneAndUpdate(
      { key: req.body.key },
      { $set: { task: req.body.task } },
      function (err, todo) {
        if (err) return next(err);
        res.send('Todo udpated.');
      }
    );
  }
  if (req.body.hasOwnProperty('isCompleted')) {
    Todo.findOneAndUpdate(
      { key: req.body.key },
      { $set: { isCompleted: req.body.isCompleted } },
      function (err, todo) {
        if (err) return next(err);
        res.send('Todo udpated.');
      }
    );
  }
};

exports.todo_delete = function (req, res, next) {
  Todo.findOneAndDelete({ key: req.body.key }, function (err, todo) {
    if (err) return next(err);
    res.send('Todo deleted.');
  });
};
