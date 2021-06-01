const uuid = require('uuid');

/**
 * A task object with id, title. order, description, userId, boardId, columId.
 * @typedef {Object} Task
 * @property {string} id a task's id.
 * @property {string} title a task's title.
 * @property {number} order a task's order.
 * @property {string} description a task's description.
 * @property {string} userId a task's id.
 * @property {string} boardId a task's boardId.
 * @property {string} columnId a task's columnId.
 * @property {Function} toResponse a task's response.
 */
class Task {
  constructor({
    id = uuid.v4(),
    title = 'string',
    order = 0,
    description = 'string',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}

module.exports = Task;
