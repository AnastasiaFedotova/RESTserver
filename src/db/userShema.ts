import * as Sequelize from "sequelize";
import sequelize from "./dbShema";
import User from "../resources/users/user.model";

User.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
