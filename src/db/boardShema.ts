import * as Sequelize from "sequelize";
import Board from "../resources/boards/board.model";
import sequelize from './dbShema';

Board.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    columns: {
      type: Sequelize.JSON,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'boards',
  }
);

export default Board;
