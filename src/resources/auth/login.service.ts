import bcrypt from 'bcrypt';
import  User from "./../../entity/User";
import  Task  from "./../../entity/Task";
import * as uuid from "uuid"

const saltRounds = 10;

const getList = () => {
  return User.find();
}

const getById = (id: string): Promise<User | undefined> => {
  return User.findOne(id)
}

const getByLogin = (login: string) => {
  return User.findOne({login: login})
}

const add = async (user: User): Promise<User> => {
  const hashpassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashpassword;
  user.id = uuid.v4();

  const newUser = User.create(user);
  const saveUser = User.save(newUser);
  return saveUser;
}

const update = async (userId: string, newUser: User) => {
  return User.update(userId, newUser);
}

const remove = async (userId: string): Promise<number> => {
  await User.delete(userId);

  const userTasks = await Task.find({where: { userId: userId }})

  await Promise.all(userTasks.map(async it => {
    it.userId = null;
    await it.save();
  }));

  return 1;
};

export {
  getList,
  getById,
  add,
  update,
  remove,
  getByLogin
};
