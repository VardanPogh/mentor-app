const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE || 'mentor',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'root',
    {
        host:  process.env.DB_HOST || 'localhost',
        dialect: 'postgres'
    },
);

module.exports = sequelize;
