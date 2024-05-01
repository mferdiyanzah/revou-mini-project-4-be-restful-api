import { type ResultSetHeader, type RowDataPacket } from "mysql2";

import pool from "../libs/db";
import { type UserModel, type UserRegisterRequest } from "../models/user.model";

const register = async (userRegisterRequest: UserRegisterRequest): Promise<number> => {
  const { email, password, username, isAdmin } = userRegisterRequest;
  const query = 'INSERT INTO users (email, password, username, is_admin) VALUES (?, ?, ?, ?)';
  const values = [email, password, username, isAdmin];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.insertId;
};

const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const values = [email];

  const [results] = await pool.query<RowDataPacket[]>(query, values);

  if (results.length === 0) {
    return null;
  }

  const [userResult] = results;
  const user: UserModel = {
    id: userResult.id,
    email: userResult.email,
    password: userResult.password,
    username: userResult.username,
    isAdmin: userResult.is_admin
  };

  return user;
};

const userRepository = {
  register,
  findUserByEmail
};

export default userRepository;