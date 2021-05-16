const { createTable } = require("../../common/customdb");
const { getTables } = require("../../common/customdb");

const usersTable = createTable("users");

const getAllUsers = () => usersTable.getItems();

const getUser = (usersId) => {
  const user = usersTable.getItem(usersId);
  return user;
};

const addUser = (user) => {
  const newUser = usersTable.addItem(user);
  return newUser;
};

const updateUser = (usersId, newUsers) => {
  const user = usersTable.updateItem(usersId, newUsers);
  return user;
};

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

