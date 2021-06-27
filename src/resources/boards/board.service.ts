import  Board  from "./../../entity/Board";
import * as uuid from "uuid"

/**
 * Returns all boards
 * @returns {Array<Board>} all boards
 */
const getAll = () => Board.find();

/**
 * Returns a board by id
 * @param {string} id boards id
 * @returns {Board} a board by id
 */
const getById = (id: string) => Board.findOne(id);

/**
 * Returns added board
 * @param {Board} body object with id, title. colums
 * @returns {Board} added a board
 */
const add = (body: Board): Promise<Board> => {
  body.id = uuid.v4();
  const created = Board.create(body);
  return Board.save(created);
};

/**
 * Returns updated board
 * @param {string} boardsId a boards id
 * @param {Board} newBody a new boards data
 * @returns {Board} updated a board
 */
const update = (id: string, newBody: Board) => {
  return Board.update(id, newBody);
};

/**
 * Returns removed a board
 * @param {string} boardsId a boards id
 * @returns {Board} removed a board
 */
const remove = (id: string) => { 
  Board.delete(id);
}

const fillBordersTable = () => {
  const first = Board.create({
    id: '1',
    title: 'board1',
    columns: [{
    id: '1',
    title: 'colum1',
    order: 1
  }]});
  first.save();

  const second = Board.create({
    id: '2',
    title: 'board2',
    columns: [{
    id: '2',
    title: 'colum2',
    order: 2
  }]});
  second.save();
}



export {
  getAll,
  getById,
  add,
  update,
  remove,
  fillBordersTable
};
