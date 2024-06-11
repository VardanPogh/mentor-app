const { literal } = require('../config/db');
const { Op } = require('sequelize');
const User_Chat = require('../models/User_chat');

async function getUserChat(reqUserId, profileUserId) {
    try {
        return await User_Chat.findOne({
            attributes: ['chatId'],
            where: {
                userId: {
                    [Op.in]: [reqUserId, profileUserId]
                }
            },
            group: 'chatId',
            having: literal('COUNT(DISTINCT "user_chat"."userId") = 2'),
        });
    } catch (error) {
        throw new Error(`Error fetching user chat: ${error.message}`);
    }
}

async function bulkCreate(reqUserId, profileUserId, chatId) {
    try {
        return User_Chat.bulkCreate([
            { userId: reqUserId, chatId },
            { userId: profileUserId, chatId }
        ]);
    } catch (error) {
        throw new Error(`Error creating user chat: ${error.message}`);
    }
}


module.exports = {
    getUserChat,
    bulkCreate
};
