import * as boardsRepo from './board.memory.repository';
import * as uuid from "uuid"
import Board from './board.model';

/**
 * Returns all boards
 * @returns {Array<Board>} all boards
 */
const getAll = () => boardsRepo.getList();

/**
 * Returns a board by id
 * @param {string} id boards id
 * @returns {Board} a board by id
 */
const getById = (id: string) => boardsRepo.getById(id);

/**
 * Returns added board
 * @param {Board} body object with id, title. colums
 * @returns {Board} added a board
 */
const add = (body: Board): Promise<Board> => {
  body.id = uuid.v4();
  return boardsRepo.add(body);
};

/**
 * Returns updated board
 * @param {string} boardsId a boards id
 * @param {Board} newBody a new boards data
 * @returns {Board} updated a board
 */
const update = (id: string, newBody: Board) => {
  return boardsRepo.update(id, newBody);
};

/**
 * Returns removed a board
 * @param {string} boardsId a boards id
 * @returns {Board} removed a board
 */
const remove = (id: string) => boardsRepo.remove(id);

export {
  getAll,
  getById,
  add,
  update,
  remove
};
