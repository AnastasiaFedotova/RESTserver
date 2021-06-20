import Task from "./../../entity/Task";
import * as uuid from "uuid"

/**
 * Returns task by id
 * @param {string} id
 * @returns {Task} task by id
 */
const getById = (id: string): Promise<Task | undefined> => Task.findOne({id: id});

/**
 * Returns added task
 * @param {string} boardId a board's id
 * @param {Task} body object with id, title. order, description, userId, boardId, columId
 * @returns {Task} added a task
 */
const add = (boardId: string, body: Task): Promise<Task> => {
  body.boardId = boardId;
  body.id = uuid.v4();
  const created = Task.create(body);
  return Task.save(created);
};

/**
 * Returns all tasks by board id
 * @param {string} boardId board id
 * @returns {Array<Task>} task array board id
 */
const getAll = (boardId: string): Promise<Array<Task>> => Task.createQueryBuilder("task").where("task.boardId = :id", { id: boardId }).getMany();

/**
 * Returns updated task
 * @param {string} tasksId tasks id
 * @param {Task} newBody a new tasks data
 * @returns {Task} updated a task
 */
const update = async (tasksId: string, newBody: Task) => {
  const task = await getById(tasksId);
  if (task == null) throw new Error("Task not found");

  newBody.id = task.id;

  return Task.save(newBody);
};

/**
 * Returns removed task by id
 * @param {string} tasksId tasks id
 * @returns {Task} removed a task
 */
const remove = (tasksId: string) => {
  Task.delete(tasksId);
}

export {
  getById,
  add,
  getAll,
  update,
  remove
};
