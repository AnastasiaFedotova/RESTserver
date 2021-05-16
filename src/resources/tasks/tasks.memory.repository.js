const { createTable } = require("../../common/customdb");

const tasksTable = createTable("tasks");

const getAllTasks = (param, equalsParam) => tasksTable.filterByParam(param, equalsParam);

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

