import * as Sequelize from 'sequelize';
import config from '../common/config'

const sequelize = new Sequelize.Sequelize(config.POSTGRES.DB, config.POSTGRES.USER, config.POSTGRES.PASSWORD, {
  dialect: 'postgres',
  host: config.POSTGRES.HOST,
  define: {
    timestamps: false
  }
});

sequelize.sync().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
})

export default sequelize;
