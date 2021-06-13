import * as Sequelize from "sequelize";
import sequelize from './dbShema';
import Task from './../resources/tasks/tasks.model';

Task.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    order: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    boardId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    columnId: {
      type: Sequelize.STRING,
      allowNull: true
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);

export default Task;
