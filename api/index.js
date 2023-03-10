// Import libraries
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const notificationRoute = require('./routes/notifications');
const conversationRoute = require('./routes/conversations');
const messagesRoute = require('./routes/messages');

const cors = require('cors');

// Config dotenv
dotenv.config();

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('DB connected!');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000',
            'http://localhost:8900',
            'https://real-time-chat-peach.vercel.app',
            'https://real-time-chat-socket.onrender.com'
        ],
    }),
);
app.use(cookieParser());
app.use(express.json());

app.get('/', (_, res) => {
    return res.json('Test');
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messagesRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Back-end server is running on port ${port}`);
});
