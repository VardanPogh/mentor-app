const User = require('./User');
const Chat = require('./Chat');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define('message', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

// Define associations
Message.belongsTo(User, { foreignKey: 'userId' });
Message.belongsTo(Chat, { foreignKey: 'chatId' });

module.exports = Message;
