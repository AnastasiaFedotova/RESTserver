const boardsRepo = require('./board.memory.repository');
const Board = require("./board.model");

/**
 * Returns all boards
 * @returns {Array<Board>} all boards
 */
const getAll = async () => {
    const boards = boardsRepo.getAllBoards();
    return boards;
}

/**
 * Returns a board by id
 * @param {string} id boards id
 * @returns {Board} a board by id
 */
const getBoard = async (id) => {
    const board = boardsRepo.getBoard(id);
    return board;
}

/**
 * Returns added board
 * @param {Board} body object with id, title. colums
 * @returns {Board} added a board
 */
const addBoard = async (body) => {
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
const updateBoard = async (boardsId, newBody) => {
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
const removeBoard = async (boardsId) => boardsRepo.removeBoard(boardsId);

module.exports = {
    getAll,
    getBoard,
    addBoard,
    updateBoard,
    removeBoard
};
