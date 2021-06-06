import * as boardsRepo from './board.memory.repository';
import * as uuid from "uuid"
import Board from './board.model';
/**
 * Returns all boards
 * @returns {Array<Board>} all boards
 */
const getAll = async () => {
  const boards = boardsRepo.getList();
  return boards;
}

/**
 * Returns a board by id
 * @param {string} id boards id
 * @returns {Board} a board by id
 */
const getById = async (id: string) => {
  const board = boardsRepo.getById(id);
  return board;
}

/**
 * Returns added board
 * @param {Board} body object with id, title. colums
 * @returns {Board} added a board
 */
const add = async (body: Board): Promise<Board> => {
  body.id = uuid.v4();
  const addedboard = boardsRepo.add(body);
  return addedboard;
};

/**
 * Returns updated board
 * @param {string} boardsId a boards id
 * @param {Board} newBody a new boards data
 * @returns {Board} updated a board
 */
const update = async (id: string, newBody: Board) => {
  const board = await getById(id);

  if (board == undefined) throw Error()

  newBody.id = board.id;

  const updatedBoard = await boardsRepo.update(id, newBody);
  return updatedBoard;
};

/**
 * Returns removed a board
 * @param {string} boardsId a boards id
 * @returns {Board} removed a board
 */
const remove = async (id: string) => boardsRepo.remove(id);

export {
  getAll,
  getById,
  add,
  update,
  remove
};
