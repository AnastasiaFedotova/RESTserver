import * as uuid from 'uuid';
import * as tasksRepo from './tasks.memory.repository';
import Task from "./tasks.model";

/**
 * Returns task by id
 * @param {string} id
 * @returns {Task} task by id
 */
const getById = async (id: string): Promise<Task | null> => {
  const task = tasksRepo.getById(id);
  return task;
}

/**
 * Returns added task
 * @param {string} boardId a board's id
 * @param {Task} body object with id, title. order, description, userId, boardId, columId
 * @returns {Task} added a task
 */
const add = async (boardId: string, body: Task): Promise<Task> => {
  body.boardId = boardId;
  body.id = uuid.v4();
  const addedtask = tasksRepo.add(body);
  return addedtask;
};

/**
 * Returns all tasks by board id
 * @param {string} boardId board id
 * @returns {Array<Task>} task array board id
 */
const getAll = async (boardId: string): Promise<Array<Task>> => {
  let tasks = tasksRepo.find(t => t.boardId === boardId);
  return tasks;
}

/**
 * Returns updated task
 * @param {string} tasksId tasks id
 * @param {Task} newBody a new tasks data
 * @returns {Task} updated a task
 */
const update = async (tasksId: string, newBody: Task) => {
  const task = await getById(tasksId);
  if (task == null) throw new Error("Task not found");

  newBody.id= task.id;

  const updatedtask = tasksRepo.update(tasksId, newBody);
  return updatedtask;
};

/**
 * Returns removed task by id
 * @param {string} tasksId tasks id
 * @returns {Task} removed a task
 */
const remove = async (tasksId: string): Promise<Task | undefined> => tasksRepo.remove(tasksId);

export {
  getById,
  add,
  getAll,
  update,
  remove
};
