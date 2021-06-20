import { ConnectionOptions } from "typeorm";
import config from "./config"

export default {
  "type": "postgres",
  "host": config.POSTGRES.HOST,
  "port": 5432,
  "username": config.POSTGRES.USER,
  "password": config.POSTGRES.PASSWORD,
  "database": config.POSTGRES.DB,
  //"synchronize": true,
  migrationsRun: true,
  "bigNumberStrings": false,
  "logging": false,
  "entities": [
     "src/entity/*.ts"
  ],
  "migrations": [
     "src/migration/*.ts"
  ],
  "subscribers": [
     "src/subscriber/**/*.ts"
  ],
  "cli": {
     "entitiesDir": "src/entity",
     "migrationsDir": "src/migration",
     "subscribersDir": "src/subscriber"
  }
} as ConnectionOptions;
