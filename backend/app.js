const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

//Configs
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const Message = require('./models/Message');
app.use('/', authRoutes);
app.use('/', userRoutes);

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Socket.io setup
io.on('connection', (socket) => {
    console.log('New client connected');

    // Join room event
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`Socket ${socket.id} joined room ${roomName}`);
    });

    // Message event
    // TODO: move to service
    socket.on('message', async (messageData) => {
        console.log('Received message:', messageData);
        // Broadcast message to all users in the room
        try {
            // Save the message to the database
            await Message.create({
                chatId: messageData.roomName,
                userId: messageData.author.id,
                content: messageData.message
            });

            // Broadcast the message to all connected clients
            io.to(messageData.roomName).emit('message', messageData);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Delete message event
    socket.on('deleteMessage', (messageData) => {
        console.log('Received delete message:', messageData);
        // Broadcast delete message event to all users in the room
        io.to(messageData.roomName).emit('deleteMessage', messageData);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
