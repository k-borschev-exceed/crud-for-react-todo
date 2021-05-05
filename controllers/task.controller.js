const Task = require('../models/task.model');
const jwt = require('jsonwebtoken');
exports.task_create = function (req, res) {
  let body = jwt.decode(req.headers.authorization);
  if (req.body.hasOwnProperty('title') && req.body.title.length) {
    let task = new Task({
      title: req.body.title,
      isCompleted: false,
      author: body.id,
    });
    task
      .save()
      .then(() => res.status(201).send('Task created successfully'))
      .catch((err) => res.status(500).send(err));
  } else {
    res.status(400).send('Bad reqswst');
  }
};

exports.task_read = function (req, res) {
  Task.find(
    { author: jwt.decode(req.headers.authorization).id },
    function (err, tasks) {
      if (err) {
        res.status(500).send('Internal server errorr');
      } else {
        tasks = tasks.map((e) => {
          return {
            title: e.title,
            isCompleted: e.isCompleted,
            id: e._id,
            author: e.author,
          };
        });
        res.status(200).send(tasks);
      }
    }
  );
};

exports.task_delete = async function (req, res) {

  const authorId = jwt.decode(req.headers.authorization).id;
  if (!authorId) {
    res.status(401).send('Unauthorized');
  } else {
    if (Array.isArray(req.body)) {
      await Task.deleteMany(
        { author: authorId, _id: { $in: req.body } },
        function (err, response) {
          if (err) res.status(500).send('Internal server error');
          else res.status(200).send('Tasks deleted');
        }
      );
    } else {
      res.status(400).send('Bad request.');
    }
  }
};

exports.task_update = async function (req, res) {
  const authorId = jwt.decode(req.headers.authorization).id;
  if (!authorId) {
    res.status(401).send('Unauthorized');
  } else {
    if (
      Array.isArray(req.body) &&
      req.body.length === 1 &&
      req.body[0].hasOwnProperty('title')
    ) {
      await Task.updateOne(
        { _id: req.body[0].id, author: authorId },
        { $set: { title: req.body[0].title } },
        function (err, task) {
          if (err || !task.n) res.status(400).send('Bad request, id not found');
          else res.status(200).send('Task updated');
        }
      );
    } else if (
      Array.isArray(req.body) &&
      req.body[0].hasOwnProperty('setComplete')
    ) {
      let ids = [];
      req.body.forEach((item) => {
        ids.push(item.id);
      });
      await Task.updateMany(
        { author: authorId, _id: { $in: ids } },
        { $set: { isCompleted: req.body[0].setComplete } },
        function (err, task) {
          if (err || !task.n || task.n !== ids.length)
            res.status(400).send('Bad request, id not found');
          else res.status(200).send('Tasks updated');
        }
      );
    } else {
      res.status(400).send('Bad request, wrong arguments');
    }
  }
};
