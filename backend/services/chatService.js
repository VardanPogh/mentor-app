const Chat = require('../models/Chat');

async function createChat() {
    try {
        return  await Chat.create({});
    } catch (error) {
        throw new Error(`Error creating chat: ${error.message}`);
    }
}


module.exports = {
    createChat,
};
