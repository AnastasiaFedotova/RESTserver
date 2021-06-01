const usersRepo = require('./user.memory.repository');
const UsersModel = require("./user.model");

/**
 * Returns all users
 * @returns {Array<User>} users array
 */
const getAllTasksBY = (): Array<typeof UsersModel> => {
  return usersRepo.getAllUsers();
}

/**
 * Returns a user by ID
 * @param {string} id users ID
 * @returns {User} user
 */
const getUser = (id: string): typeof UsersModel => {
  const user = usersRepo.getUsers(id);
  return user;
}

/**
 * Returns added a new user
 * @param {User} body responses body with new users data
 * @returns {User} a new user
 */
const addUser = async (body: typeof User): Promise<typeof UsersModel> => {
  const newUser = new UsersModel(body);
  const addedUser = usersRepo.addUsers(newUser);
  return addedUser;
};

/**
 * Returns updated a user
 * @param {string} usersId a users id
 * @param {User} newBody responses body with a users data
 * @returns {User} updated a user
 */
const updateUser = async (usersId: string, newBody: typeof UsersModel): Promise<typeof UsersModel> => {
  const user = await getUser(usersId);
  const newUser = {
    ...user,
    ...newBody
  }

  const updatedUser = await usersRepo.updateUsers(usersId, newUser);
  return updatedUser;
};

/**
 * Returns deleted a user
 * @param {string} usersId a users id
 * @returns {User} deleted a user
 */
const removeUser = async (usersId: string): Promise<typeof UsersModel> => {
  const user = await usersRepo.removeUsers(usersId);
  return user;
};

module.exports = {
  getAllTasksBY,
  getUser,
  addUser,
  updateUser,
  removeUser
};
