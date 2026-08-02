import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError('An account with this email already exists', 409);
  }

  return User.create({ name, email, password });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchesPassword(password))) {
    throw new ApiError('Invalid email or password', 401);
  }

  return user;
};
