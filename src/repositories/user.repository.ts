import { type ResultSetHeader, type RowDataPacket } from "mysql2";

import pool from "../libs/db";
import { type UserModel, type UserRegisterRequest } from "../models/user.model";

const register = async (user: UserRegisterRequest): Promise<number> => {
  const query = `
    INSERT INTO users (email, password, username)
    VALUES (?, ?, ?);  
  `;
  const values = [user.email, user.password, user.username];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.insertId;
};

const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const values = [email];

  const [results] = await pool.query<RowDataPacket[]>(query, values);

  if (results.length === 0) {
    return null;
  }

  const user: UserModel = {
    id: results[0].id,
    email: results[0].email,
    password: results[0].password,
    username: results[0].username,
    isAdmin: results[0].is_admin
  };

  return user;
};

const userRepository = {
  register,
  findUserByEmail
};

export default userRepository;