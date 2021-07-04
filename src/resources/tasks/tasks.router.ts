import express from 'express';
import * as tasksService from './tasks.service';
import auth from '../../middlewares/auth';
const router = express.Router();

router.use(auth);

router.route('/:boardId/tasks').post(async (req, res) => {
    try {
      const {boardId} = req.params;
      const newtask = req.body;
      const task = await tasksService.add(boardId, newtask);
      res.contentType('application/json');
      res.status(201).json(task);
    }
    catch(error) {
      console.log(error)
    }
});


router.route('/:boardId/tasks').get(async (req, res) => {
  try {
    const {boardId} = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.contentType('application/json');
    res.statusCode = 200;
    res.json(tasks);
  }
  catch(error) {
    console.log(error)
  }
});

router.route('/:boardId/tasks/:idTasks').get(async (req, res) => {
    const taskId = req.params.idTasks;
    const task = await tasksService.getById(taskId);
    if (task) {
      res.contentType('application/json');
      res.json(task).status(200);
    } else {
      res.statusCode = 404;
      res.send('task not found');
    }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
    const newData = req.body;
    const {taskId} = req.params;
    const task = await tasksService.update(taskId, newData);
    res.contentType('application/json');
    res.status(200).json(task);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    const {taskId} = req.params;
    await tasksService.remove(taskId);
    res.contentType('application/json');
    res.statusCode = 204;
    res.json('The task has been deleted');
  }
  catch(error) {
    console.log(error);
  }
});

export default router;
