import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "cineprime",
  port: 3306,
};

const pool = mysql.createPool(config);

export default pool;
