import mysql from 'mysql2';

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cineprime',
  port: 3308,
}

const connection = mysql.createConnection(config);

export default connection;
