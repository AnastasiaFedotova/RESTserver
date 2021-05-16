const createTable = require("./tasks.service");

const tasksTable = createTable("tasks");

const getAllTasks = () => tasksTable.getItems();

const getTask = async (tasksId) => {
  const task = await tasksTable.getItem(tasksId);
  if (!task) {
    return null;
  }
  return task;
};

const addTask = (task) => {
  const newtask = tasksTable.addItem(task);
  return newtask;
};

const updateTask = (tasksId, newtasks) => {
  const task = tasksTable.updateItem(tasksId, newtasks);
  return task;
};

const removeTask = (tasksId) => {
  const task = tasksTable.removeItem(tasksId);
  return task;
};

module.exports = { 
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  removeTask
};

