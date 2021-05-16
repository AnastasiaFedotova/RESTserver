const router = require('express').Router();
const boardsService = require('./board.service');
const { errorHandler } = require("../errorHandler");
// const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.contentType('application/json');
    res.statusCode = 200;
    res.json(boards);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const boardId = req.params.id;
    const board = await boardsService.getBoard(boardId);
    if (board) {
      res.contentType('application/json');
      res.json(board).status(200);
    } else {
      res.statusCode = 404;
      res.send('Board not found');
    }
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newBoard = req.body;
    const board = await boardsService.addBoard(newBoard);
    res.contentType('application/json');
    res.status(201).json(board);
  } catch (err) {
    errorHandler(res, err);
  };
});

router.route('/:id').put(async (req, res) => {
  try {
    const newData = req.body;
    const userId = req.params.id;
    const board = await boardsService.updateBoard(userId, newData);
    res.contentType('application/json');
    res.status(200).json(board);
  } catch (err) {
    errorHandler(res, err);
  };
});

router.route('/:id').delete(async (req, res) => {
    try {
      const boardId = req.params.id;
      await boardsService.removeBoard(boardId);
      res.contentType('application/json');
      res.statusCode = 204;
      res.json('The board has been deleted');
    } catch (err) {
      errorHandler(res, err);
    };
});

module.exports = router;
