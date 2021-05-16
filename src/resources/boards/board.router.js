const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const errorHandler = require("../errorHandler");

router.route('/').get(async (req, res) => {
  try {
    const board = await boardsService.getAll();
    res.contentType('application/json');
    res.json(board.map(Board.toResponse)).status(200);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const boardId = req.params.id;
    const board = await boardsService.getBoard(boardId);

    res.contentType('application/json');
    res.json(Board.toResponse(board)).status(201);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newBoard = req.body;
    const board = await boardsService.addBoard(newBoard);
    res.contentType('application/json');
    res.status(201).json(Board.toResponse(board));
  } catch (err) {
    errorHandler(res, err);
  };
});

router.route('/:id').put(async (req, res) => {
  try {
    const newDate = req.body;
    const boardId = req.params.id;
    const board = await boardsService.updateUser(boardId, newDate);
    res.contentType('application/json');
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    errorHandler(res, err);
  };
});

router.route('/:id').delete(async (req, res) => {
  try {
    const boardId = req.params.id;
    await boardsService.removeBoard(boardId);
    res.status(204).json('The board has been deleted');
  } catch (err) {
    errorHandler(res, err);
  };
});

module.exports = router;
