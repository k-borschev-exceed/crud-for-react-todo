const Task = require('../models/task.model');

exports.task_create = function (req, res) {
  if (
    req.body.hasOwnProperty('isCompleted') &&
    req.body.hasOwnProperty('title') &&
    req.body.title.length &&
    typeof req.body.isCompleted === 'boolean'
  ) {
    let task = new Task({
      title: req.body.title,
      isCompleted: req.body.isCompleted,
    });
    task
      .save()
      .then(() => res.status(201).send('Task created successfully'))
      .catch(() => res.status(500).send('Internal server error'));
  } else {
    res.status(400).send('Bad request');
  }
};

exports.task_read = function (req, res) {
  Task.find({}, function (err, tasks) {
    if (err) res.status(500).send('Internal server error');

    tasks = tasks.map((e) => {
      return { title: e.title, isCompleted: e.isCompleted, id: e._id };
    });
    res.send(tasks);
  });
};

exports.task_update = function (req, res) {
  let badRequest = false;
  if (req.body) {
    req.body.forEach((item) => {
      if (
        ((Object.keys(item).length === 2 &&
          ((item.hasOwnProperty('isCompleted') &&
            typeof item.isCompleted === 'boolean') ||
            (item.hasOwnProperty('title') && item.title.length))) ||
          (Object.keys(item).length === 3 &&
            item.hasOwnProperty('isCompleted') &&
            typeof item.isCompleted === 'boolean' &&
            item.hasOwnProperty('title') &&
            item.title.length)) &&
        item.hasOwnProperty('id')
      ) {
        Task.findByIdAndUpdate(item.id, { $set: item }).catch(() => {
          res.status(500).send('Internal server error');
        });
      } else {
        badRequest = true;
        res.status(400).send('Bad request');
      }
    });
    if (!badRequest) res.status(200).send('Task(s) updated succussfully');
  } else {
    res.status(400).send('Bad request');
  }
};

exports.task_delete = function (req, res) {
  if (req.body) {
    req.body.forEach((item) => {
      Task.findByIdAndDelete(item.id).catch(() =>
        res.status(500).send('Internal server error')
      );
    });
    res.status(200).send('Task(s) deleted successfully');
  } else {
    res.status(400).send('Bad request');
  }
};
