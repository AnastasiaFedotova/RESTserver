const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'string',
    columns = [
      {
        id: uuid.v4(),
        title: 'string',
        order: 0,
      },
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;