const Task = require('../models/task.model');

exports.task_create = function (req, res, next) {
  console.log(req.body, 'req body');
  let task = new Task({
    title: req.body.title,
    isCompleted: req.body.isCompleted,
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

    tasks = tasks.map((e) => {
      return { title: e.title, isCompleted: e.isCompleted, id: e._id };
    });
    res.send(tasks);
  });
};

exports.task_update = function (req, res, next) {
  if (req.body[0].hasOwnProperty('title')) {
    req.body.forEach((item) => {
      Task.findByIdAndUpdate(
        item.id,
        { $set: { title: item.title } },
        function (err) {
          if (err) return next(err);
        }
      );
    });
  }
  if (req.body[0].hasOwnProperty('isCompleted')) {
    req.body.forEach((item) => {
      Task.findOneAndUpdate(
        { _id: item.id, isCompleted: !item.isCompleted },
        { $set: { isCompleted: item.isCompleted } },
        function (err) {
          if (err) return next(err);
        }
      );
    });
  }
  res.send('task updated');
};

exports.task_delete = async function (req, res, next) {
  await req.body.forEach((item) => {
    Task.findByIdAndDelete(item.id, function (err) {
      if (err) return next(err);
    });
  });
  res.send('task(s) deleted.');
};
