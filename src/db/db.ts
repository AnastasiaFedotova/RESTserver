import { createConnection } from 'typeorm';
import config from '../common/ormconfig';
import logger from '../common/logger'
import config2 from "../common/config"
//import { fillBordersTable } from '../resources/boards/board.service'
import * as userService from '../resources/users/user.service'
import { types } from "pg"
import User from '../entity/User';

types.setTypeParser(types.builtins.NUMERIC, (value: string): number => parseFloat(value))
export default createConnection(config)
  .then(_ => {
    //fillBordersTable();
    return userService.getByLogin("admin");
  })
  .then(res => {
    const newUser = new User();
      newUser.login = 'admin';
      newUser.password = 'admin';
      newUser.name = 'admin';
    if (!res) userService.add(newUser)
    logger.logInfo("Connection with db has been created1")
  })
  .catch(err => {
    logger.logInfo("", config2.POSTGRES)
    logger.logError("Error appered when try to connect to db", err)
  });
