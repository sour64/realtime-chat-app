const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');
const path = require('path');

const app = express();

require('dotenv').config(); //загрузка переменных окружения из файла .env.

app.use(express.json());
app.use(cors()); //разрешение кросс-доменных запросов.

app.use('/api/users', userRoute); //использование маршрутов для пользователей, определенных в userRoute.
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

/* настройка отдачи фронта для деплоя: */
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/', (req, res) => {
    res.send('Welcome');
});

const Port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI; //URI для подключения к MongoDB

app.listen(Port, (require, response) => { //запуск сервера на указанном порту.
    console.log(`Server running on port: ${Port}`);
});

mongoose.connect(uri)
    .then(() => console.log('MongoDB connection established'))
    .catch((error) => console.log('MongoDB connection failed: ', error.message));