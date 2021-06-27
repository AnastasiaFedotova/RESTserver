import jwt from 'jsonwebtoken';
import config from '../../common/config';
import AuthUser from '../../models/authUser';

const generateAccessToken = (user: AuthUser) => {
  return jwt.sign(user, config.TOKEN_SECRET, { expiresIn: '1800s' });
}

export {
  generateAccessToken
};
