import * as usersRepo from './user.memory.repository';
import User from "./user.model";
import * as uuid from 'uuid'

/**
 * Returns all users
 * @returns {Array<User>} users array
 */
const getList = (): Promise<User[]> => {
  return usersRepo.getList();
}

/**
 * Returns a user by ID
 * @param {string} id users ID
 * @returns {User} user
 */
const getById = (id: string): Promise<User | undefined> => {
  const user = usersRepo.getById(id);
  return user;
}

/**
 * Returns added a new user
 * @param {User} body responses body with new users data
 * @returns {User} a new user
 */
const add = async (body: User): Promise<User> => {
  body.id = uuid.v4();
  const addedUser = usersRepo.add(body);
  return addedUser;
};

/**
 * Returns updated a user
 * @param {string} usersId a users id
 * @param {User} newBody responses body with a users data
 * @returns {User} updated a user
 */
const update = async (id: string, newBody: User): Promise<User> => {
  const user = await getById(id);
  if (user == undefined) throw Error();

  newBody.id = user.id;

  const updatedUser = await usersRepo.update(user.id, newBody);
  return updatedUser;
};

/**
 * Returns deleted a user
 * @param {string} usersId a users id
 * @returns {User} deleted a user
 */
const remove = async (usersId: string): Promise<User | undefined> => {
  const user = await usersRepo.remove(usersId);
  return user;
};

export {
  getList,
  getById,
  add,
  update,
  remove
};
