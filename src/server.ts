require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import {  NestExpressApplication } from '@nestjs/platform-express';
import {  NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fetch from 'node-fetch';
import { HttpExceptionFilter } from './middlewares/unhandledExceptions';
import { AppModule } from './app.module';
import configVal from './common/config';
import './db/db';
import logger from './common/logger';

async function bootstrap() {
  let app;
  if (configVal.USE_FASTIFY === "true") app = await NestFactory.create<NestFastifyApplication>(AppModule);
  else app = await NestFactory.create<NestExpressApplication>(AppModule);
  fetch(`http://localhost:${process.env['PORT']}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: 'admin',
      name: 'admin',
      password: 'admin',
      secretPass: process.env['JWT_SECRET_KEY']
    })
  }).then(res => res.json()).then((data) => {
    if (data.exists) {
      console.log('Admin was exist');
    } else {
      console.log('Admin was created');
    }
  }).catch(err => {
    console.log(err.message);
  });
  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion('1.0')
    .addTag('users board task')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configVal.PORT, configVal.HOST, () =>
    logger.logInfo(`App is running on http://${configVal.HOST}:${configVal.PORT}`)
  );
}

bootstrap();

process.on('unhandledRejection', (reason, p) => {
    logger.logWarn('Unhandled Rejection at Promise', reason, p);
  })
  .on('uncaughtException', err => {
    logger.logError('Uncaught Exception thrown', err);
    process.exit(1);
  });
