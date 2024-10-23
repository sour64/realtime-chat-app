const allChatModel = require ("../Models/AllChatModel");

const createChat = async (req, res) => {
    const {firstId} = req.body;

    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });

        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        const response = await newChat.save();

        res.status(200).json(response);

    }catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// module.exports = ;