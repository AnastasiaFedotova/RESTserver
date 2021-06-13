
import { Model } from 'sequelize';

/**
 * A user object with id, name, login, password.
 * @typedef {Class} User
 * @property {string} id a user's id.
 * @property {string} name a user's name.
 * @property {string} login a user's login.
 * @property {string} password a user's password.
 * @property {Function} toResponse a user's resonse.
 */
class User  extends Model{
  password!: string;
  login!: string;
  id!: string;
  name!: string;
}

export default User;
