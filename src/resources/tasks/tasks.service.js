const tasksRepo = require('./tasks.memory.repository');
const Task = require("./tasks.model");

const getTask = async (id) => {
    const task = tasksRepo.getTask(id);
    return task;
}

const addTask = async (boardId, body) => {
    const newtask = new Task({ ...body, boardId });
    const addedtask = await tasksRepo.addTask(newtask);
    return addedtask;
};

const getAll = async (boardId) => {
    let tasks = await tasksRepo.getAllTasks('boardId', boardId);
    if (tasks.length === 0) {
        tasks = [await addTask(boardId)];
    }
    return tasks;
}

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
    tasksRepo.removeTask(tasksId);
};

module.exports = {
    getAll,
    getTask,
    addTask,
    updateTask,
    removeTask
};
