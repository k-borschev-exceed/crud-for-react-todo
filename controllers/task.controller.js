const Task = require('../models/task.model');

exports.task_create = function (req, res) {
  let task = new Task({
    title: req.body.title,
    isCompleted: req.body.isCompleted,
  });

  task
    .save()
    .then(() => res.status(201).send('Task created successfully'))
    .catch(() => res.status(500).send('Internal server error'));
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
  //const { title, isCompleted } = req.body;

  req.body.forEach((item) => {
    //const {title, isCompleted} = req.body;
    Task.findByIdAndUpdate(item.id, { $set: { title: item.title, isCompleted: item.isCompleted } }).catch(() =>                      //ошибка здесь
      res.status(500).send('Internal server error')
    );
  });
  res.status(200).send('Task(s) updated succussfully');
};

exports.task_delete = function (req, res) {
  req.body.forEach((item) => {
    Task.findByIdAndDelete(item.id).catch(() =>
      res.status(500).send('Internal server error')
    );
  });
  res.status(204).send('Task(s) deleted successfully');
};
