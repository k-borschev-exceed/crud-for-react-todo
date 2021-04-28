const Task = require('../models/task.model');

exports.task_create = function (req, res, next) {
  let task = new Task({
    task: req.body.task,
    isCompleted: req.body.isCompleted,
    key: req.body.key,
  });

  task.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send('task Created successfully');
  });
};

exports.task_read = function (req, res, next) {
  Task.find({}, function (err, tasks) {
    if (err) return next(err);

    // tasks = tasks.map(e => {
    //   return {task: e.task, isCompleted: e.isCompleted, key: e.key};
    // })
    res.send(tasks);
  });
};

exports.task_update = function (req, res, next) {
  console.log(req.body, 'req body')
  if (req.body[0].hasOwnProperty('task')) {
    req.body.forEach(item => {
        Task.findOneAndUpdate(
            { key: item.key },
            { $set: { task: item.task } },
            function (err) {
              if (err) return next(err);
            }
        );
    })
  }
  if (req.body[0].hasOwnProperty('isCompleted')) {
    req.body.forEach(item => {
        Task.findOneAndUpdate(
            { key: item.key, isCompleted: !item.isCompleted },
            { $set: { isCompleted: item.isCompleted } },
            function (err) {
              if (err) return next(err);
            }
        );
    })
  }
  res.send('task updated')
};

exports.task_delete = function (req, res, next) {
  console.log(req.body)
    req.body.forEach(item => {
        Task.findOneAndDelete({ key: item.key }, function (err) {
        if (err) return next(err);
        });
    })
    res.send('task(s) deleted.');
};
