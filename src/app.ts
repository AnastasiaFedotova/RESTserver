import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import yaml from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';

const app = express();
const swaggerDocument = yaml.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

export { app }
