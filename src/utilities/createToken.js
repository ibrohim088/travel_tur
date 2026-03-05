import jwt from 'jsonwebtoken';
import config from './config.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    config.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export default generateToken