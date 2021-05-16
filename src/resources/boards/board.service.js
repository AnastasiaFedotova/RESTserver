const boardsRepo = require('./board.memory.repository');
const Board = require("./board.model");

const getAll = () => boardsRepo.getAllBoards();

const getBoard = (id) => {
    const board = boardsRepo.getboard(id);
    return board;
}

const addBoard = async (body) => {
    const newBoard = new Board(body);
    const addedboard = boardsRepo.addboard(newBoard);
    return addedboard;
};

const updateBoard = async (boardsId, newBody) => {
    const board = await getBoard(boardsId);
    const newboard = {
        ...board,
        ...newBody
    }

    const updatedBoard = await boardsRepo.updateboard(boardsId, newboard);
    return updatedBoard;
};

const removeBoard = async (boardsId) => {
    const board = await boardsRepo.removeboard(boardsId);
    return board;
};

module.exports = { 
    getAll,
    getBoard,
    addBoard,
    updateBoard,
    removeBoard
};
