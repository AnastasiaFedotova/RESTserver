import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../common/config';
import logger from '../common/logger';

const auth = async function (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token || typeof token !== 'string' ) throw new Error()
    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    logger.logInfo("logged", decoded);
    next();
  } catch(err) {
    res.status(401).json(err);
  }


}

export default auth;
