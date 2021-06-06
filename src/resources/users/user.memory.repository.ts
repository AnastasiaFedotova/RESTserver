import dbContext from "../../common/db.memory";
import User from "./user.model";

/**
 * A user object with id, name, login, password.
 * @typedef {Object} User
 * @property {string} id a user's id.
 * @property {string} name a user's name.
 * @property {string} login a user's login.
 * @property {string} password a user's password.
 */

/**
 * Returns all users
 * @returns {Array<User>} users array
 */
const getList = async (): Promise<Array<User>> => dbContext.getUsersTable().getItems();

/**
 * Returns a user by ID
 * @param {string} usersId users ID
 * @returns {User} user
 */
const getById = (id: string): Promise<User | undefined> => {
  const user = dbContext.getUsersTable().getItem(id);
  return user;
};

/**
 * Returns added a new user
 * @param {User} user object to be added
 * @returns {User} a new user
 */
const add = (user: User): Promise<User> => {
  const newUser = dbContext.getUsersTable().addItem(user);
  return newUser;
};

/**
 * Returns updated a user
 * @param {string} usersId a users id
 * @param {User} newUsers a new users data
 * @returns {User} updated a user
 */
const update = (id: string, newUser: User): Promise<User> => {
  const user = dbContext.getUsersTable().updateItem(id, newUser);
  return user;
};

/**
 * Returns deleted a user
 * @param {string} usersId a users id
 * @returns {User} deleted a user
 */
const remove = async (id: string): Promise<User | undefined> => {
  const user = await dbContext.getUsersTable().removeItem(id);
  const usersTasks = await dbContext.getTasksTable().getItems();

  usersTasks.forEach((item: { userId: string | null }) => {
    if (item.userId === id) {
      const task = item;
      task.userId = null;
    }
  });

  return user;
};

export {
  getList,
  getById,
  add,
  update,
  remove
};

