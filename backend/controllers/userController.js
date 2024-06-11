const chatService = require('../services/chatService');
const userService = require('../services/userService');
const fieldService = require('../services/fieldService');
const messageService = require('../services/messageService');
const userChatService = require('../services/userChatService');

exports.getAllUsers = async (req, res) => {
    try {
        const { firstName, lastName, type, fieldId } = req.query;

        const users = await userService.getAllUsers({ firstName, lastName, type, fieldId });
        const fields = await fieldService.getAllFields();

        return res.render('user-list', { users, fields, firstName, lastName, type, fieldId });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profileUser = await userService.getProfile(req.params.id);

        if (!profileUser) {
            return res.render('404', {});
        }

        const userChat = await userChatService.getUserChat(req.user.id, profileUser.id);

        let chatId;
        if (!userChat) {
            const chat = await chatService.createChat();

            await userChatService.bulkCreate(req.user.id, profileUser.id, chat.id);
            chatId = chat.id;
        } else {
            chatId = userChat.chatId;
        }

        const messages = await messageService.getAllMessages(chatId);

        return res.render('profile', { reqUser: req.user.id, profileUser, chat: { id: chatId }, messages });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.getEditProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.params.id);
        const fields = await fieldService.getAllFields();

        if (!user) {
            return res.render('404', {});
        }

        if (req.user.id !== user.id) {
            return res.status(403).send('Unauthorized');
        }

        return res.render('profile-edit', { user, fields });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

exports.postEditProfile = async (req, res) => {
    try {

        await userService.updateProfile(req.user.id, req.params.id, req.body);

        res.status(200).send({
            message: 'successfully changed'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json([{ message: error.message ? error.message : 'Server Error' }]);
    }
};
