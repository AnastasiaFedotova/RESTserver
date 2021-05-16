const { createTable } = require("../../common/customdb");
const Board = require("./board.model");

const boardsTable = createTable("boards");

const getAllBoards = () => boardsTable.getItems();

const getBoard = async (boardsId) => {
  const board = await boardsTable.getItem(boardsId);
  if (!board) {
    return null;
  }
  return board;
};

const addBoard = (board) => {
  const newboard = boardsTable.addItem(board);
  return newboard;
};

boardsTable.addItem(new Board());
boardsTable.addItem(new Board());

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

