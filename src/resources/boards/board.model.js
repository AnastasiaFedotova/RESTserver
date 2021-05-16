const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'string',
    colums = [
      {
        id: uuid.v4(), 
        title: 'string',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.colums = colums;
  }

  static toResponse(board) {
    const { id, title, colums } = board;
    return { id, title, colums };
  }
}

module.exports = Board;
