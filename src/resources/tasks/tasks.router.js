const router = require('express').Router();
const tasksService = require('./tasks.service');
const { errorHandler } = require("../errorHandler");

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll();
    res.contentType('application/json');
    res.statusCode = 200;
    res.json(tasks);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await tasksService.getTask(taskId);
    if (task) {
      res.contentType('application/json');
      res.json(task).status(200);
    } else {
      res.statusCode = 404;
      res.send('task not found');
    }
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newtask = req.body;
    const task = await tasksService.addTask(newtask);
    res.contentType('application/json');
    res.status(201).json(task);
  } catch (err) {
    errorHandler(res, err);
  };
});

router.route('/:id').put(async (req, res) => {
  try {
    const newData = req.body;
    const userId = req.params.id;
    const task = await tasksService.updateTask(userId, newData);
    res.contentType('application/json');
    res.status(200).json(task);
  } catch (err) {
    errorHandler(res, err);
  };
});

router.route('/:id').delete(async (req, res) => {
    try {
      const taskId = req.params.id;
      await tasksService.removeTask(taskId);
      res.contentType('application/json');
      res.statusCode = 204;
      res.json('The task has been deleted');
    } catch (err) {
      errorHandler(res, err);
    };
});

module.exports = router;
