const { createTable } = require("../../common/customdb");
const { getTables } = require("../../common/customdb");

const usersTable = createTable("users");
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
const getAllUsers = () => usersTable.getItems();

/**
 * Returns a user by ID
 * @param {string} usersId users ID
 * @returns {User} user
 */
const getUser = (usersId) => {
  const user = usersTable.getItem(usersId);
  return user;
};

/**
 * Returns added a new user
 * @param {User} user object to be added
 * @returns {User} a new user
 */
const addUser = (user) => {
  const newUser = usersTable.addItem(user);
  return newUser;
};

/**
 * Returns updated a user
 * @param {string} usersId a users id
 * @param {User} newUsers a new users data
 * @returns {User} updated a user
 */
const updateUser = (usersId, newUsers) => {
  const user = usersTable.updateItem(usersId, newUsers);
  return user;
};

/**
 * Returns deleted a user
 * @param {string} usersId a users id
 * @returns {User} deleted a user
 */
const removeUser = async (usersId) => {
  const user = usersTable.removeItem(usersId);

  const TableTasks = await getTables().find((items) => items.name === 'tasks');
  const usersTasksawait = await TableTasks.getItems();
  usersTasksawait.forEach((item) => {
    if (item.userId === usersId) {
      const task = item;
      task.userId = null;
    }
  });

  return user;
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  removeUser
};

