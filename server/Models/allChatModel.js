const mongoose = require("mongoose");

const chatSchema= new mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true,
    });

const allChatModel = mongoose.model('allChatRoom', chatSchema);

module.exports = allChatModel;