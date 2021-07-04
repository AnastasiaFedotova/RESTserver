require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import {  NestExpressApplication } from '@nestjs/platform-express';
import {  NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './middlewares/unhandledExceptions';
import { AppModule } from './app.module';
import configVal from './common/config';
import './db/db';
import Logger from './common/logger';
import { types } from 'pg';

async function bootstrap() {
  let app = (configVal.USE_FASTIFY === "true") ? 
  await NestFactory.create<NestFastifyApplication>(AppModule)
  : await NestFactory.create<NestExpressApplication>(AppModule);
  let logger = await app.get(Logger)
  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion('1.0')
    .addTag('users board task')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  types.setTypeParser(types.builtins.NUMERIC, (value: string): number => parseFloat(value))

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  await app.listen(configVal.PORT, configVal.HOST, () =>
    logger.logInfo(`App is running on http://${configVal.HOST}:${configVal.PORT}`)
  );
}

bootstrap();

/*process.on('unhandledRejection', (reason, p) => {
    logger.logWarn('Unhandled Rejection at Promise', reason, p);
  })
  .on('uncaughtException', err => {
    logger.logError('Uncaught Exception thrown', err);
    process.exit(1);
  });
*/