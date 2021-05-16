const boardsRepo = require('./board.memory.repository');
const Board = require("./board.model");

const getAll = async () => {
    const boards = boardsRepo.getAllBoards();
    return boards;
}
const getBoard = async (id) => {
    const board = boardsRepo.getBoard(id);
    return board;
}

const addBoard = async (body) => {
    const newBoard = new Board(body);
    const addedboard = boardsRepo.addBoard(newBoard);
    return addedboard;
};

const updateBoard = async (boardsId, newBody) => {
    const board = await getBoard(boardsId);
    const newboard = {
        ...board,
        ...newBody
    }

    const updatedBoard = await boardsRepo.updateBoard(boardsId, newboard);
    return updatedBoard;
};

const removeBoard = async (boardsId) => {
    boardsRepo.removeBoard(boardsId);
};

module.exports = {
    getAll,
    getBoard,
    addBoard,
    updateBoard,
    removeBoard
};
