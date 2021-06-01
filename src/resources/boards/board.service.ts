const boardsRepo = require('./board.memory.repository');
const boardModel = require("./board.model");

/**
 * Returns all boards
 * @returns {Array<Board>} all boards
 */
const gettedAll = async () => {
  const boards = boardsRepo.getAllBoards();
  return boards;
}

/**
 * Returns a board by id
 * @param {string} id boards id
 * @returns {Board} a board by id
 */
const gettedBoard = async (id: string) => {
  const board = boardsRepo.getBoard(id);
  return board;
}

/**
 * Returns added board
 * @param {Board} body object with id, title. colums
 * @returns {Board} added a board
 */
const addedBoard = async (body: typeof boardModel): Promise<typeof boardModel> => {
  const newBoard = new Board(body);
  const addedboard = boardsRepo.addBoard(newBoard);
  return addedboard;
};

/**
 * Returns updated board
 * @param {string} boardsId a boards id
 * @param {Board} newBody a new boards data
 * @returns {Board} updated a board
 */
const updatedBoard = async (boardsId: string, newBody: typeof boardModel) => {
  const board = await getBoard(boardsId);
  const newboard = {
    ...board,
    ...newBody
  }

  const updatedBoard = await boardsRepo.updateBoard(boardsId, newboard);
  return updatedBoard;
};

/**
 * Returns removed a board
 * @param {string} boardsId a boards id
 * @returns {Board} removed a board
 */
const removedBoard = async (boardsId: string) => boardsRepo.removeBoard(boardsId);

module.exports = {
  gettedAll,
  gettedBoard,
  addedBoard,
  updatedBoard,
  removedBoard
};
