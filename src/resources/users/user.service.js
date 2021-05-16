const usersRepo = require('./user.memory.repository');
const User = require("./user.model");

const getAll = () => usersRepo.getAllUsers();

const getUser = (id) => {
    const user = usersRepo.getUser(id);
    return user;
}

const addUser = async (body) => {
    const newUser = new User(body);
    const addedUser = usersRepo.addUser(newUser);
    return addedUser;
};

const updateUser = async (usersId, newBody) => {
    const user = await getUser(usersId);
    const newUser = {
        ...user,
        ...newBody
    }

    const updatedUser = await usersRepo.updateUser(usersId, newUser);
    return updatedUser;
};

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
