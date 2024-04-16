import { RowDataPacket } from 'mysql2';
import connection from '../libs/db';
import { UserRegisterRequest } from '../models/user.model';

const UserRepository = () => {
  const register = async (user: UserRegisterRequest): Promise<RowDataPacket> => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`;
      const values = [user.email, user.password, user.username];

      connection.query<RowDataPacket[]>(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  const findByEmail = async (email: string) => {
    try {
      const sqlQuery = `SELECT * FROM users WHERE email = ?`;
      const sqlParams = [email];

      // const results = await executeQuery(sqlQuery, sqlParams) as any[];
      // return results[0];
      return 0;
    } catch (err) {
      throw err;
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const sqlQuery = `SELECT * FROM users WHERE email = ? AND password = ?`;
      const sqlParams = [email, password];

      // const results = await executeQuery(sqlQuery, sqlParams) as mysql.OkPacket[];
      // return results[0];
      return 0;
    } catch (err) {
      throw err;
    }
  }

  return {
    register,
    findByEmail,
    login
  }
};

export default UserRepository;