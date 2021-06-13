import * as Sequelize from "sequelize";
import Board from "../resources/boards/board.model";
import sequelize from './dbShema';

Board.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    columns: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'boards',
  }
);

export default Board;
