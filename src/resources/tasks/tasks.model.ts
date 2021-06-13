import { Model } from 'sequelize';

/**
 * A task object with id, title. order, description, userId, boardId, columId.
 * @typedef {Object} Task
 * @property {string} id a task's id.
 * @property {string} title a task's title.
 * @property {number} order a task's order.
 * @property {string} description a task's description.
 * @property {string | null} userId a task's id.
 * @property {string | null} boardId a task's boardId.
 * @property {string | null} columnId a task's columnId.
 * @property {Function} toResponse a task's response.
 */

 interface task {
  id: string
  title: string
  order: number
  description: string
  userId?: string
}
 export default class Task extends Model {
  id!: string;
  title!: string;
  order!: number;
  description!: string;
  userId?: string;
  boardId?: string;
  columnId?: string;

  static toResponse(task: Task): task {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}
