const usersRepo = require('./user.memory.repository');
const User = require("./user.model");

/**
 * Returns all users
 * @returns {Array<User>} users array
 */
const getAll = () => usersRepo.getAllUsers();

/**
 * Returns a user by ID
 * @param {string} id users ID
 * @returns {User} user
 */
const getUser = (id) => {
    const user = usersRepo.getUser(id);
    return user;
}

/**
 * Returns added a new user
 * @param {User} body responses body with new users data
 * @returns {User} a new user
 */
const addUser = async (body) => {
    const newUser = new User(body);
    const addedUser = usersRepo.addUser(newUser);
    return addedUser;
};

/**
 * Returns updated a user
 * @param {string} usersId a users id
 * @param {User} newBody responses body with a users data
 * @returns {User} updated a user
 */
const updateUser = async (usersId, newBody) => {
    const user = await getUser(usersId);
    const newUser = {
        ...user,
        ...newBody
    }

    const updatedUser = await usersRepo.updateUser(usersId, newUser);
    return updatedUser;
};

/**
 * Returns deleted a user
 * @param {string} usersId a users id
 * @returns {User} deleted a user
 */
const removeUser = async (usersId) => {
    const user = await usersRepo.removeUser(usersId);
    return user;
};

module.exports = {
    getAll,
    getUser,
    addUser,
    updateUser,
    removeUser
};
