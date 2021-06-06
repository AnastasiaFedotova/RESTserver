import Board from "./board.model";
import dbContext from "../../common/db.memory";

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
const getList = () => dbContext.getBoardsTable().getItems();

/**
 * Returns a board by id
 * @param {string} boardsId boards id
 * @returns {Board} a board by id
 */
const getById = async (id: string) => {
  const board = dbContext.getBoardsTable().getItem(id);
  return board;
};

/**
 * Returns added board
 * @param {Board} board object with id, title. colums
 * @returns {Board} added a board
 */
const add = (board: Board) => {
  const newboard = dbContext.getBoardsTable().addItem(board);
  return newboard;
};

/**
 * Returns updated board
 * @param {string} boardsId a boards id
 * @param {Board} newBoards a new boards data
 * @returns {Board} updated a board
 */
const update = (boardsId: string, newBoards: Board) => {
  const board = dbContext.getBoardsTable().updateItem(boardsId, newBoards);
  return board;
};

/**
 * Returns removed a board
 * @param {string} boardsId a boards id
 * @returns {Board} removed a board
 */
const remove = async (id: string) => {
  const board = dbContext.getBoardsTable().removeItem(id);
  const taskTable = dbContext.getTasksTable();

  taskTable.removeItems(t => t.boardId === id);
  return board;
};

export {
  getList,
  getById,
  add,
  update,
  remove
};

