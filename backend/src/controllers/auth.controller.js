import { loginUser, registerUser } from '../services/auth.service.js';
import generateToken from '../utils/generateToken.js';

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: isProduction,
  maxAge:
    Number(process.env.COOKIE_EXPIRES_IN_DAYS || 7) * 24 * 60 * 60 * 1000,
};

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

const setAuthCookie = (res, userId) => {
  res.cookie('token', generateToken(userId), cookieOptions);
};

export const register = async (req, res) => {
  const user = await registerUser(req.body);

  setAuthCookie(res, user.id);
  res.status(201).json({
    message: 'Account created successfully',
    user: publicUser(user),
  });
};

export const login = async (req, res) => {
  const user = await loginUser(req.body);

  setAuthCookie(res, user.id);
  res.status(200).json({
    message: 'Logged in successfully',
    user: publicUser(user),
  });
};

export const logout = (req, res) => {
  const { maxAge, ...clearOptions } = cookieOptions;

  res.clearCookie('token', clearOptions);
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getCurrentUser = (req, res) => {
  res.status(200).json({ user: publicUser(req.user) });
};
