const User = require('../models/User');
const Message = require('../models/Message');

async function getAllMessages(chatId) {
    try {
        return await Message.findAll({
            where: { chatId: chatId },
            include: [User]
        });

    } catch (error) {
        throw new Error(`Error fetching messages: ${error.message}`);
    }
}


module.exports = {
    getAllMessages,
};
