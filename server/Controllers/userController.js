const userModel = require('../Models/Usermodel');
const bcrypt = require('bcrypt'); //библиотека для хэширования паролей.
const validator = require('validator'); //библиотека для валидации строк (например, проверки email)
const jwt = require('jsonwebtoken'); // библиотека для создания и проверки JSON Web Tokens

const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY;  //получение секретного ключа для подписи JWT из переменных окружения
                                                //создание JWT с payload, содержащим идентификатор пользователя (_id)
    return jwt.sign({_id}, jwtkey);     //и подписывание токена с использованием секретного ключа (jwtkey)
};

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        let user = await userModel.findOne({email}); //проверка, существует ли пользователь с данным email.

        if(user)
            return res.status(400).json('User with the given email already exist');

        if(!name || !email || !password)
            return res.status(400).json('All fields are required');

        if(!validator.isEmail(email))
            return res.status(400).json("Email must be a valid email");

        if(!validator.isStrongPassword(password))
            return res.status(400).json("Password must be a strong password");

        user = new userModel({name, email, password}); //создание пользователя, если пользователь с таким email не найден.

        const salt = await bcrypt.genSalt(10); //генерация соли для хэширования пароля.
        user.password = await bcrypt.hash(user.password, salt); //хэширование пароля пользователя.

        await user.save(); //сохранение нового пользователя в базе данных.

        const token = createToken(user._id); //создание JWT токена для нового пользователя.

        res.status(200).json({_id: user._id, name, email, token}); //отправка ответа с данными пользователя и токеном.
    }catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

const loginUser = async(req, res) =>{
    const {email, password} = req.body;

    try{
        let user = await userModel.findOne({email});

        if(!user) return res.status(400).json("Invalid email or password");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) return res.status(400).json("Invalid email or password");

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name: user.name, email, token});

    }catch (error){
        console.log(error)
        res.status(500).json(error);
    }
}

const findUser = async (req, res) =>{
    const userId = req.params.userId; //получение идентификатора пользователя из параметров маршрута.
    try {
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    }catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const getUsers = async (req, res) =>{
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    }catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

module.exports = {registerUser, loginUser, findUser, getUsers};