const tasksRepo = require('./tasks.memory.repository');
const Task2 = require("./tasks.model");

/**
 * Returns task by id
 * @param {string} id
 * @returns {Task} task by id
 */
const getTask = async (id: string): Promise<typeof Task2> => {
  const task = tasksRepo.getTasks(id);
  return task;
}

/**
 * Returns added task
 * @param {string} boardId a board's id
 * @param {Task} body object with id, title. order, description, userId, boardId, columId
 * @returns {Task} added a task
 */
const addTask = async (boardId: string, body: typeof Task2 | null): Promise<typeof Task2> => {
  const newtask = new Task({ ...body, boardId });
  const addedtask = await tasksRepo.addTasks(newtask);
  return addedtask;
};

/**
 * Returns all tasks by board id
 * @param {string} boardId board id
 * @returns {Array<Task>} task array board id
 */
const getAll = async (boardId: string): Promise<Array<typeof Task2>> => {
  let tasks = await tasksRepo.getAllTasks('boardId', boardId);
  if (tasks.length === 0) {
    tasks = [await addTask(boardId, {})];
  }
  return tasks;
}

/**
 * Returns updated task
 * @param {string} tasksId tasks id
 * @param {Task} newBody a new tasks data
 * @returns {Task} updated a task
 */
const updateTask = async (tasksId: string, newBody: typeof Task2) => {
  const task = await getTasks(tasksId);
  const newtask = {
    ...task,
    ...newBody
  }

  const updatedtask = await tasksRepo.updateTasks(tasksId, newtask);
  return updatedtask;
};

/**
 * Returns removed task by id
 * @param {string} tasksId tasks id
 * @returns {Task} removed a task
 */
const removeTask = async (tasksId: string): Promise<typeof Task2> => tasksRepo.removeTasks(tasksId);

module.exports = {
  getAll,
  getTask,
  addTask,
  updateTask,
  removeTask
};
