
import TaskModel from "./tasks.model";
import Task from "./../../db/taskShema";

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
const find = (boardId: string): Promise<TaskModel[]> => Task.findAll(
  {
    where: {
      boardId: boardId
    }
  }
);

/**
 * Returns task by id
 * @param {string} tasksId
 * @returns {Task} task by id
 */
const getById = (tasksId: string): Promise<TaskModel | null> => Task.findOne(
  {
    where: {
      id: tasksId
    }
  }
);

/**
 * Returns added task
 * @param {Task} task object with id, title. order, description, userId, boardId, columId
 * @returns {Task} added a task
 */
const add = (task: Task): Promise<TaskModel> => Task.create(task);

/**
 * Returns updated task
 * @param {string} tasksId tasks id
 * @param {Task} task a new tasks data
 * @returns {Task} updated a task
 */
const update = (tasksId: string, newtasks: Task) => Task.update({ ...newtasks, id: tasksId }, {
  where: {
    id: tasksId
  }
});

/**
 * Returns removed task
 * @param {string} tasksId tasks id
 * @returns {Task} removed a task
 */
const remove = (tasksId: string) => Task.destroy({
  where: {
    id: tasksId
  }
});

export {
  find,
  getById,
  add,
  update,
  remove
};

