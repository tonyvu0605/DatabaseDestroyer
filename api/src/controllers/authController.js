import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fetchUserByEmail, registerUser } from '../models/authModels.js';
// ----------------------------------------------------------------------

// Register checks if user exists before
// it creates a hashed password and inserts user
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await fetchUserByEmail(email);

    if (userExists.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate salt and hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await registerUser({ email, hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const currentEnvironment = process.env.NODE_ENV === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: currentEnvironment,
      sameSite: 'lax',
    };

    const { email, password } = req.body;

    let userData = await fetchUserByEmail(email);

    if (userData.length === 0) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    userData = userData[0];

    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: userData.user_id }, process.env.JWT_SECRET);

    const user = {
      userId: userData.user_id,
      email: userData.email,
      avatar: userData.avatar,
    };

    res.cookie('accessToken', token, cookieOptions).status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};
