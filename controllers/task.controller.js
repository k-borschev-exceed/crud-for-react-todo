const Task = require('../models/task.model');
const jwt = require('jsonwebtoken');
/////wher emongoose!~!!!!!!!!!!!!1
exports.task_create = function (req, res) {
  if (
    req.body.hasOwnProperty('isCompleted') &&
    req.body.hasOwnProperty('title') &&
    req.body.title.length &&
    typeof req.body.isCompleted === 'boolean' &&
    jwt.decode(req.headers.authorization).id === req.body.author
  ) {
    let task = new Task({
      title: req.body.title,
      isCompleted: req.body.isCompleted,
      author: req.body.author,
    });
    task
      .save()
      .then(() => res.status(201).send('Task created successfully'))
      .catch((err) => res.status(500).send(err));
  } else {
    res.status(400).send('Bad request');
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
          return { title: e.title, isCompleted: e.isCompleted, id: e._id, author: e.author };
        });
        res.send(tasks);
      }
    }
  );
};

exports.task_update = function (req, res) {
  let badRequest = false;
  if (req.body) {
    console.log('tttttttttttt');
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
        item.hasOwnProperty('id') &&
        jwt.decode(req.headers.authorization).id === item.author
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

exports.task_delete = function async(req, res, next) {
  let errors = [];
  console.log(!!req.body, 'is req body');
  if (req.body) {// проверка на массив
    // console.log('inside req body');
    req.body.forEach(async (item) => {
      // console.log('inside foreach');
      await Task.findById(item.id, async (err, task) => {
        if (err) res.status(400).send('Bad request');

        if (jwt.decode(req.headers.authorization).id === task.author) {
          // console.log('dobrali');
          await Task.findByIdAndDelete(item.id, async (err, docs) => {
            if (err) {
              // console.log('errors++');
              errors++;
            }
          });
        } else {
           console.log('noelse');
          errors++; 
           console.log(errors);
          res.status(403).send();
        } 
      });
    });
    console.log(errors, 'errors outsiee');

  } else {
    res.status(400).send('Bad request');

  }
  console.log(errors, 'errors outside outside');
  if (!errors) res.status(200).send('Task(s) deleted successfully');
  else res.status(400).send('Bad request');
};
