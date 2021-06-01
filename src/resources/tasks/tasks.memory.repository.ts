const { createTable } = require("../../common/customdb");
const Task1 = require("./tasks.model");
const tasksTable = createTable("tasks");

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
 * Returns all tasks by param
 * @param {string} param param key to search
 * @param {equalsParam} equalsParam param value to search
 * @returns {Array<Task>} task array by param
 */
const getAllTasks = (param: string, equalsParam: string): typeof Task1 => tasksTable.filterByParam(param, equalsParam);

/**
 * Returns task by id
 * @param {string} tasksId
 * @returns {Task} task by id
 */
const getTasks = async (tasksId: string): Promise<typeof Task1> => {
  const task = await tasksTable.getItem(tasksId);
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
const addTasks = (task: typeof Task): typeof Task1 => {
  const newtask = tasksTable.addItem(task);
  return newtask;
};

/**
 * Returns updated task
 * @param {string} tasksId tasks id
 * @param {Task} task a new tasks data
 * @returns {Task} updated a task
 */
const updateTasks = (tasksId: string, newtasks: typeof Task1): typeof Task1 => {
  const task = tasksTable.updateItem(tasksId, newtasks);
  return task;
};

/**
 * Returns removed task
 * @param {string} tasksId tasks id
 * @returns {Task} removed a task
 */
const removeTasks = (tasksId: string): typeof Task1 => {
  const task = tasksTable.removeItem(tasksId);
  return task;
};

module.exports = {
  getAllTasks,
  getTasks,
  addTasks,
  updateTasks,
  removeTasks
};

