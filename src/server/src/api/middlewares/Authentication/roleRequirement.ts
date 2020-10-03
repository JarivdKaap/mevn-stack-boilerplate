import jwt from 'jsonwebtoken';
import config from '../../../config';
import set from 'lodash.set';
import logger from '../../../loaders/logger';

const rules = {
  isPublic: ['public', 'user', 'admin'],
  isUser: ['user', 'admin'],
  isAdmin: ['admin'],
};

const getTokenFromHeader = req => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const UnauthorizedError = {
  status: 'Access Denied',
  success: false,
  message: 'You are not authorized to access this resource',
};

export default (rule: string) => {
  return (req, res, next) => {
    logger.silly('Looking for rule: ' + rule);
    // Get the JWT token
    const token = getTokenFromHeader(req);
    if (!token && rule == 'public') {
      logger.silly('No token found and endpoint is public');
      return next();
    } else if (!token || token == null) {
      logger.silly('No token found');
      return res.status(403).json(UnauthorizedError);
    }

    // Verify the token

    try {
      jwt.verify(token, config.jwtSecret);
    } catch (err) {
      logger.silly('Verify token error: ');
      logger.silly(err);
      return next(new Error(err));
    }

    // Decode the jwt token
    let dToken;
    try {
      dToken = jwt.decode(token, { complete: true }) || {};
    } catch (err) {
      logger.silly('Decode token error: ');
      logger.silly(err);
      return next(new Error(err));
    }

    set(req, 'token', dToken.payload);

    // Check if the user is allowed
    if (rules[rule].includes(dToken.payload.role)) {
      logger.silly('role requirement successful');
      return next();
    }
    logger.silly('role requirement not successful');
    return res.status(403).json(UnauthorizedError);
  };
};
