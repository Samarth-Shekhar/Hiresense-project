import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

const getToken = (req) => {
  if (req.cookies.token) {
    return req.cookies.token;
  }

  const authorization = req.get('authorization');
  return authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;
};

export const protect = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return next(new ApiError('Authentication required', 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);

    if (!user) {
      return next(new ApiError('User account no longer exists', 401));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(new ApiError('Invalid or expired token', 401));
  }
};
