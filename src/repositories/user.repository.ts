import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../libs/db";
import { UserModel, UserRegisterRequest } from "../models/user.model";

const register = async (user: UserRegisterRequest): Promise<number> => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`;
    const values = [user.email, user.password, user.username];

    connection.query<ResultSetHeader>(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    connection.query<RowDataPacket[]>(query, values, (err, results) => {
      if (err) {
        reject(err);
      }

      if (results.length === 0) {
        resolve(null);
        return;
      }

      const user: UserModel = {
        id: results[0].id,
        email: results[0].email,
        password: results[0].password,
        username: results[0].username
      };
      resolve(user);
    });
  });
}

const userRepository = {
  register,
  findUserByEmail
};

export default userRepository;