const { createTable } = require("../../common/customdb");
const { getTables } = require("../../common/customdb");

const Board = require("./board.model");

const boardsTable = createTable("boards");

/**
 * A colum with id, title, order.
 * @typedef {Object} Colum
 * @property {string} id a colum's id.
 * @property {string} title a colum's title.
 * @property {number} order a colum's order.
 */

/**
 * A board object with id, title. colums.
 * @typedef {Object} Board
 * @property {string} id a task's id.
 * @property {string} title a task's title.
 * @property {Array<Colum>} columns a task's columns.
 */

/**
 * Returns all boards
 * @returns {Array<Board>} all boards
 */
const getAllBoards = () => boardsTable.getItems();

/**
 * Returns a board by id
 * @param {string} boardsId boards id
 * @returns {Board} a board by id
 */
const getBoard = async (boardsId) => {
  const board = await boardsTable.getItem(boardsId);
  if (!board) {
    return null;
  }
  return board;
};

/**
 * Returns added board
 * @param {Board} board object with id, title. colums
 * @returns {Board} added a board
 */
const addBoard = (board) => {
  const newboard = boardsTable.addItem(board);
  return newboard;
};

boardsTable.addItem(new Board());
boardsTable.addItem(new Board());

/**
 * Returns updated board
 * @param {string} boardsId a boards id
 * @param {Board} newBoards a new boards data
 * @returns {Board} updated a board
 */
const updateBoard = (boardsId, newBoards) => {
  const board = boardsTable.updateItem(boardsId, newBoards);
  return board;
};

/**
 * Returns removed a board
 * @param {string} boardsId a boards id
 * @returns {Board} removed a board
 */
const removeBoard = (boardsId) => {
  const board = boardsTable.removeItem(boardsId);
  const TableTasks = getTables().find((items) => items.name === 'tasks');

  TableTasks.clearByParam('boardsId', boardsId)
  return board;
};

module.exports = {
  getAllBoards,
  getBoard,
  addBoard,
  updateBoard,
  removeBoard
};

