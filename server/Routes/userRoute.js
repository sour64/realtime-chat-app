const express = require('express');
const {
    registerUser,
    loginUser,
    findUser,
    getUsers,
} = require('../Controllers/userController');

const router = express.Router(); //Объект маршрутизатора Express
                                //Маршрутизаторы позволяют группировать маршруты и применять middleware к группам маршрутов.
    router.post('/register', registerUser);
    router.post('/login', loginUser);
    router.get('/find/:userId', findUser);
    router.get('/', getUsers);

module.exports = router;