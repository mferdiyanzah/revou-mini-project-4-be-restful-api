import dotenv from 'dotenv';
import mysql from "mysql2/promise";

dotenv.config();

const config = {
  host: process.env.MYSQL_HOST ?? "localhost",
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE ?? "cinema_booking",
  port: parseInt(process.env.MYSQL_PORT ?? "3306"),
};

const pool = mysql.createPool(config);

export default pool;
