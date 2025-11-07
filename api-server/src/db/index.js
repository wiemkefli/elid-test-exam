const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'mdms_lite',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || process.env.DB_PASSWORD || '123456',
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
    define: {
      underscored: true,        // created_at / updated_at
      freezeTableName: true,    // use given table names
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 10000,
    },
  }
);

module.exports = { sequelize };
