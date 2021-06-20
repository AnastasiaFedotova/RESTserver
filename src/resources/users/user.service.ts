import * as usersRepo from './user.memory.repository';
import User from "./user.model";
import * as uuid from 'uuid'

/**
 * Returns all users
 * @returns {Array<User>} users array
 */
const getList = (): Promise<User[]> => usersRepo.getList();

/**
 * Returns a user by ID
 * @param {string} id users ID
 * @returns {User} user
 */
const getById = (id: string): Promise<User | null> => usersRepo.getById(id);

/**
 * Returns added a new user
 * @param {User} body responses body with new users data
 * @returns {User} a new user
 */
const add = (body: User): Promise<User> => {
  body.id = uuid.v4();
  return usersRepo.add(body);
};

/**
 * Returns updated a user
 * @param {string} usersId a users id
 * @param {User} newBody responses body with a users data
 * @returns {User} updated a user
 */
const update = async (id: string, newBody: User) => {
  return usersRepo.update(id, newBody);
};

/**
 * Returns deleted a user
 * @param {string} usersId a users id
 * @returns {User} deleted a user
 */
const remove = (usersId: string): Promise<number> => {
  return usersRepo.remove(usersId);
};

export {
  getList,
  getById,
  add,
  update,
  remove
};
