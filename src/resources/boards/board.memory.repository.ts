import Board from "./../../db/boardShema";
import Task from "./../../db/taskShema";
import BoardModel from "./board.model";

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
const getList = (): Promise<BoardModel[]> => Board.findAll();

/**
 * Returns a board by id
 * @param {string} boardsId boards id
 * @returns {Board} a board by id
 */
const getById = (id: string): Promise<BoardModel | null> => Board.findOne({ where: {id: id} })

/**
 * Returns added board
 * @param {Board} board object with id, title. colums
 * @returns {Board} added a board
 */
const add = (board: BoardModel): Promise<BoardModel> => {
  return Board.create(board);
}

/**
 * Returns updated board
 * @param {string} boardsId a boards id
 * @param {Board} newBoards a new boards data
 * @returns {Board} updated a board
 */
const update = (boardsId: string, newBoards: Board) => Board.update({ ...newBoards, id: boardsId }, {
  where: {
    id: boardsId
  }
});

/**
 * Returns removed a board
 * @param {string} boardsId a boards id
 * @returns {Board} removed a board
 */

const remove = (id: string) => {
  const board = Board.destroy({
    where: {
      id: id
    }
  })

  Task.destroy({
    where: {
      boardId: id
    }
  })

  return board;
};

const fillBordersTable = () => {
  Board.create({
    id: '1',
    title: 'board1',
    columns: [{
    id: '1',
    title: 'colum1',
    order: 1
  }]});

  Board.create({
    id: '2',
    title: 'board2',
    columns: [{
    id: '2',
    title: 'colum2',
    order: 2
  }]});
}

export {
  getList,
  getById,
  add,
  update,
  remove,
  fillBordersTable
};

