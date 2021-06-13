import * as uuid from 'uuid';
import * as tasksRepo from './tasks.memory.repository';
import Task from "./tasks.model";

/**
 * Returns task by id
 * @param {string} id
 * @returns {Task} task by id
 */
const getById = (id: string): Promise<Task | null> => tasksRepo.getById(id);

/**
 * Returns added task
 * @param {string} boardId a board's id
 * @param {Task} body object with id, title. order, description, userId, boardId, columId
 * @returns {Task} added a task
 */
const add = (boardId: string, body: Task): Promise<Task> => {
  body.boardId = boardId;
  body.id = uuid.v4();
  return tasksRepo.add(body);
};

/**
 * Returns all tasks by board id
 * @param {string} boardId board id
 * @returns {Array<Task>} task array board id
 */
const getAll = (boardId: string): Promise<Array<Task>> => tasksRepo.find(boardId);

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

  return tasksRepo.update(tasksId, newBody);
};

/**
 * Returns removed task by id
 * @param {string} tasksId tasks id
 * @returns {Task} removed a task
 */
const remove = (tasksId: string) => tasksRepo.remove(tasksId);

export {
  getById,
  add,
  getAll,
  update,
  remove
};
