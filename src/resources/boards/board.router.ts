import express from 'express';
import * as boardService from './board.service';
import tasksRouter from './../../resources/tasks/tasks.router';

const router = express.Router();

router.route('/').get(async (_, res) => {
    const boards = await boardService.getAll();
    res.contentType('application/json');
    res.statusCode = 200;
    res.json(boards);
});

router.route('/:id').get(async (req, res) => {
    const boardId = req.params.id;
    const board = await boardService.getById(boardId);
    if (board) {
      res.contentType('application/json');
      res.json(board).status(200);
    } else {
      res.statusCode = 404;
      res.send('Board not found');
    }
});

router.route('/').post(async (req, res) => {
  try {
    const newBoard = req.body;
    const board = await boardService.add(newBoard);
    res.contentType('application/json');
    res.status(201).json(board);
  }
  catch(err) {
    console.log(err);
  }
});

router.route('/:id').put(async (req, res) => {
    const newData = req.body;
    const userId = req.params.id;
    const board = await boardService.update(userId, newData);
    res.contentType('application/json');
    res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
    try {
      const boardId = req.params.id;
      await boardService.remove(boardId);
      res.contentType('application/json');
      res.statusCode = 204;
      res.json('The board has been deleted');
    }
    catch(error) {
      console.log(error)
    }
});

router.use('/', tasksRouter)

export default router;
