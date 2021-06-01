const router = require('express').Router();
const tasksService = require('./tasks.service');
const { errorHandler } = require("../errorHandler");

router.route('/:boardId/tasks').post(async (req, res) => {
  try {
    const {boardId} = req.params;
    const newtask = req.body;
    const task = await tasksService.addTask(boardId, newtask);
    res.contentType('application/json');
    res.status(201).json(task);
  } catch (err) {
    errorHandler(res, err);
  }
});


router.route('/:boardId/tasks').get(async (req, res) => {
  try {
    const {boardId} = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.contentType('application/json');
    res.statusCode = 200;
    res.json(tasks);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/:boardId/tasks/:idTasks').get(async (req, res) => {
  try {
    const taskId = req.params.idTasks;
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

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const newData = req.body;
    const {taskId} = req.params;
    const task = await tasksService.updateTask(taskId, newData);
    res.contentType('application/json');
    res.status(200).json(task);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
    try {
      const {taskId} = req.params;
      await tasksService.removeTask(taskId);
      res.contentType('application/json');
      res.statusCode = 204;
      res.json('The task has been deleted');
    } catch (err) {
      errorHandler(res, err);
    }
});

module.exports = router;
