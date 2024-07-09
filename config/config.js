const dotenv = require('dotenv');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

console.log("DB_HOST:", process.env.DB_HOST_PROD);
console.log("DB_USER:", process.env.DB_USER_PROD);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD_PROD);
console.log("DB_NAME:", process.env.DB_NAME_PROD);
console.log("DB_PORT:", process.env.DB_PORT_PROD);

module.exports = {
  development: {
    username: process.env.DB_USER || admin,
    password: process.env.DB_PASSWORD || admin,
    database: process.env.DB_NAME || db_coworking,
    host: process.env.DB_HOST || localhost,
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST_PROD,
    port: parseInt(process.env.DB_PORT_PROD) || 3306,
    dialect: 'mysql'
  }
};
