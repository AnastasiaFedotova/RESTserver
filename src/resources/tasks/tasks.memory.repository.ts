
import Task from "./tasks.model";
import dbContext from "../../common/db.memory";

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
 */

/**
 * Returns all tasks by filter
 * @param {string} param param key to search
 * @param {equalsParam} equalsParam param value to search
 * @returns {Array<Task>} task array by param
 */
const find = (predicator: (value: Task) => Boolean): Promise<Task[]> => dbContext.getTasksTable()
    .find(predicator);

/**
 * Returns task by id
 * @param {string} tasksId
 * @returns {Task} task by id
 */
const getById = async (tasksId: string): Promise<Task | null> => {
  const task = await dbContext.getTasksTable().getItem(tasksId);
  if (!task) {
    return null;
  }
  return task;
};

/**
 * Returns added task
 * @param {Task} task object with id, title. order, description, userId, boardId, columId
 * @returns {Task} added a task
 */
const add = (task: Task): Promise<Task> => {
  const newtask = dbContext.getTasksTable().addItem(task);
  return newtask;
};

/**
 * Returns updated task
 * @param {string} tasksId tasks id
 * @param {Task} task a new tasks data
 * @returns {Task} updated a task
 */
const update = (tasksId: string, newtasks: Task): Promise<Task> => {
  const task = dbContext.getTasksTable().updateItem(tasksId, newtasks);
  return task;
};

/**
 * Returns removed task
 * @param {string} tasksId tasks id
 * @returns {Task} removed a task
 */
const remove = (tasksId: string): Promise<Task | undefined> => {
  const task = dbContext.getTasksTable().removeItem(tasksId);
  return task;
};

export {
  find,
  getById,
  add,
  update,
  remove
};

