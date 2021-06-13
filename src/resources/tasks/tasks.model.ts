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

  id: string
  title: string
  order: number
  description: string
  userId: string | null
  boardId: string | null
  columnId: string | null

  constructor(id: string, title: string, order: number, description: string, userId: string | null,
    boardId: string | null, columnId: string | null) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: Task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}

export default Task;
