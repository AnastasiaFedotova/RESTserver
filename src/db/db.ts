import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import config from "../common/config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      "type": "postgres",
      "host": config.POSTGRES.HOST,
      "port": 5432,
      "username": config.POSTGRES.USER,
      "password": config.POSTGRES.PASSWORD,
      "database": config.POSTGRES.DB,
      //"synchronize": true,
      migrationsRun: true,
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
    };
  }
}
