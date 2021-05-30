const uuid = require('uuid');

/**
 * A colum with id, title, order.
 * @typedef {Object} Colum
 * @property {string} id a colum's id.
 * @property {string} title a colum's title.
 * @property {number} order a colum's order.
 */

/**
 * A board object with id, title. colums.
 * @typedef {Class} Board
 * @property {string} id a task's id.
 * @property {string} title a task's title.
 * @property {Array<Colum>} columns a task's columns.
 */
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
