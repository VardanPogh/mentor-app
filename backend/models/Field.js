const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Field = sequelize.define('field', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false
});

module.exports = Field;
