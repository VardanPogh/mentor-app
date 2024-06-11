const User = require('./User');
const Chat = require('./Chat');
const sequelize = require('../config/db');

const User_Chat = sequelize.define('user_chat', {
}, {});

// Define associations
User_Chat.belongsTo(User);
User_Chat.belongsTo(Chat);
Chat.belongsToMany(User, { through: 'user_chat', foreignKey: 'chatId' });
User.belongsToMany(Chat, { through: 'user_chat', foreignKey: 'userId' });

module.exports = User_Chat;
