const createTable = require("../../common/customdb");

const boardsTable = createTable("boards");

const getAllBoards = () => boardsTable.getItems();

const getBoard = (boardsId) => {
  const board = boardsTable.getItem(boardsId);
  return board;
};

const addBoard = (board) => {
  const newboard = boardsTable.addItem(board);
  return newboard;
};

const updateBoard = (boardsId, newBoards) => {
  const board = boardsTable.updateItem(boardsId, newBoards);
  return board;
};

const removeBoard = (boardsId) => {
  const board = boardsTable.removeItem(boardsId);
  return board;
};

module.exports = { 
  getAllBoards,
  getBoard,
  addBoard,
  updateBoard,
  removeBoard
};

