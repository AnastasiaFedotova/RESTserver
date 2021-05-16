const tasksRepo = require('./tasks.memory.repository');
const Task = require("./tasks.model");

const getAll = async () => {
    const tasks = tasksRepo.getAllTasks();
    return tasks;
}
const getTask = async (id) => {
    const task = tasksRepo.getTask(id);
    return task;
}

const addTask = async (body) => {
    const newtask = new Task(body);
    const addedtask = tasksRepo.addtask(newtask);
    return addedtask;
};

const updateTask = async (tasksId, newBody) => {
    const task = await getTask(tasksId);
    const newtask = {
        ...task,
        ...newBody
    }

    const updatedtask = await tasksRepo.updateTask(tasksId, newtask);
    return updatedtask;
};

const removeTask = async (tasksId) => {
    tasksRepo.removetask(tasksId);
};

module.exports = {
    getAll,
    getTask,
    addTask,
    updateTask,
    removeTask
};
