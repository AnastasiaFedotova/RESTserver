import jwt from 'jsonwebtoken';
import config from '../../common/config';

const generateAccessToken = (userData: {login: string | undefined, userId: string | undefined}) => {
  return jwt.sign(userData, config.TOKEN_SECRET, { expiresIn: '1800s' });
}

export {
  generateAccessToken
};
