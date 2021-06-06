
/**
 * A user object with id, name, login, password.
 * @typedef {Class} User
 * @property {string} id a user's id.
 * @property {string} name a user's name.
 * @property {string} login a user's login.
 * @property {string} password a user's password.
 * @property {Function} toResponse a user's resonse.
 */
class User {
  password: string;
  login: string;
  id: string;
  name: string;
  constructor(
    id: string,
    name: string,
    login: string,
    password: string) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

export default User;
