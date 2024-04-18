import { executeQuery } from '../utils/dbHelpers.js';

export const registerUser = async ({ email, hashedPassword }) => {
  const registerUserSQL = 'INSERT INTO Users (email, password) values (?, ?);';

  const registerUserValues = [email, hashedPassword];

  return executeQuery(registerUserSQL, registerUserValues);
};

export const fetchUserByEmail = async (email) => {
  const fetchUserByEmailSQL = 'SELECT * FROM Users WHERE email =?;';

  const fetchUserByEmailValues = [email];

  return executeQuery(fetchUserByEmailSQL, fetchUserByEmailValues);
};
