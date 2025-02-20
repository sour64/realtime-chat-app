import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
import {useFetchRecipientUser} from "../../hooks/useFetchRecipient.js";
import {useState} from 'react';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';


const ChatBox = () => {

    const {user} = useContext(AuthContext);
    const {currentChat, messages, isMessagesLoading, sendTextMessage} = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");

    // console.log('text', textMessage);

    if(!recipientUser)
        return (<p className={'choose_dialog'}>No conversation selected yet..</p>);

    if(isMessagesLoading)
        return (<p>Loading chat...</p>);

    return(
        <div className="chat_box">
            <div className='chat_header'>
                <strong>{recipientUser?.name}</strong>
            </div>
            <div className='messages'>
                {messages && messages.map((message, index) => (
                    <div key={index} className={`${message?.senderId === user?._id
                        ? 'align_self_end'
                        : 'align_self_start'}`}>
                        <span className='message'>{message.text}</span>
                        <div className='message_footer'>
                                {moment(message.createdAt).calendar()}
                        </div>
                    </div>
                ))}
            </div>
            <div className='chat_bottom'>
                <div className='chat_input'>
                    <InputEmoji
                        value={textMessage}
                        onChange={setTextMessage}
                        onEnter={() =>
                            sendTextMessage(textMessage,user,currentChat._id,setTextMessage)}
                        borderColor="rgba(72,112,223,0.2)"
                        fontFamily='nunito'
                        className='chat_input'
                        placeholder="Type a message"
                        shouldReturn="true"
                    />
                </div>
                <button className='send_btn' onClick={() =>
                    sendTextMessage(textMessage,user,currentChat._id,setTextMessage)}>
                    send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;