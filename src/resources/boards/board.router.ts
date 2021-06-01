const boardRouter = require('express').Router();
const boardsService = require('./board.service');
const err = require("../errorHandler");
const tasksRouter = require("../tasks/tasks.router");

boardRouter.route('/').get(async (_req: string, res: { contentType: (arg0: string) => void; statusCode: number; json: (arg0: string) => void; }) => {
  try {
    const boards = await boardsService.gettedAll();
    res.contentType('application/json');
    res.statusCode = 200;
    res.json(boards);
  } catch (err) {
    err.errorHandler(res, err);
  }
});

boardRouter.route('/:id').get(async (req: { params: { id: string; }; }, res: { contentType: (arg0: string) => void; json: (arg0: string) => { (): string; new(): string; status: { (arg0: number): void; new(): string; }; }; statusCode: number; send: (arg0: string) => void; }) => {
  try {
    const boardId = req.params.id;
    const board = await boardsService.gettedBoard(boardId);
    if (board) {
      res.contentType('application/json');
      res.json(board).status(200);
    } else {
      res.statusCode = 404;
      res.send('Board not found');
    }
  } catch (err) {
    err.errorHandler(res, err);
  }
});

boardRouter.route('/').post(async (req: { body: string; }, res: { contentType: (arg0: string) => void; status: (arg0: number) => { (): string; new(): string; json: { (arg0: string): void; new(): string; }; }; }) => {
  try {
    const newBoard = req.body;
    const board = await boardsService.addedBoard(newBoard);
    res.contentType('application/json');
    res.status(201).json(board);
  } catch (err) {
    err.errorHandler(res, err);
  }
});

boardRouter.route('/:id').put(async (req: { body: string; params: { id: string; }; }, res: { contentType: (arg0: string) => void; status: (arg0: number) => { (): string; new(): string; json: { (arg0: string): void; new(): string; }; }; }) => {
  try {
    const newData = req.body;
    const userId = req.params.id;
    const board = await boardsService.updatedBoard(userId, newData);
    res.contentType('application/json');
    res.status(200).json(board);
  } catch (err) {
    err.errorHandler(res, err);
  }
});

boardRouter.route('/:id').delete(async (req: { params: { id: string; }; }, res: { contentType: (arg0: string) => void; statusCode: number; json: (arg0: string) => void; }) => {
  try {
    const boardId = req.params.id;
    await boardsService.removedBoard(boardId);
    res.contentType('application/json');
    res.statusCode = 204;
    res.json('The board has been deleted');
  } catch (err) {
    err.errorHandler(res, err);
  }
});

boardRouter.use('/', tasksRouter)

module.exports = boardRouter;
