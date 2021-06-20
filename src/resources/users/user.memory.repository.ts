import UserModel from "./user.model";
import User from "./../../db/userShema";
import Task from "./../../db/taskShema";

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
const getList = (): Promise<Array<UserModel>> => User.findAll();

/**
 * Returns a user by ID
 * @param {string} usersId users ID
 * @returns {User} user
 */
const getById = (id: string) => User.findOne(
  {
    where: {
      id: id
    }
  }
)

/**
 * Returns added a new user
 * @param {User} user object to be added
 * @returns {User} a new user
 */
const add = (user: User): Promise<UserModel> => User.create(user);

/**
 * Returns updated a user
 * @param {string} usersId a users id
 * @param {User} newUsers a new users data
 * @returns {User} updated a user
 */
const update = async (userId: string, newUser: UserModel) => {
  return User.update({ ...newUser, id: userId }, {
    where: {
      id: userId
    }
  });
}

/**
 * Returns deleted a user
 * @param {string} usersId a users id
 * @returns {User} deleted a user
 */
const remove = async (userId: string): Promise<number> => {
  const user = await User.destroy({
    where: {
      id: userId
    }
  });

  await Task.update({ userId: null }, {
    where: {
      userId: userId
    }
  })

  return user;
};

export {
  getList,
  getById,
  add,
  update,
  remove
};

