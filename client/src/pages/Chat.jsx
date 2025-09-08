import {useContext, useState} from "react";
import {ChatContext} from "../context/ChatContext.jsx";
import UserChat from "../components/chat/UserChat";
import {AuthContext} from "../context/AuthContext.jsx";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox.jsx";

const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);


    const {user} = useContext(AuthContext);
    const {sidebarOpen} = useContext(ChatContext);
    const {setSidebarOpen} = useContext(ChatContext);

    const {
        userChats,
        isUserChatsLoading,
        updateCurrentChat,
    } = useContext(ChatContext);

    console.log('userChats',userChats);

    const handleChatClick = (chat) => {
        setSelectedChat(chat);
        updateCurrentChat(chat);
    };

    return (
        <>
            <main className="main_chat_page">

                <div className={`users_and_chats${sidebarOpen ? " open" : ""}`}>
                    <PotentialChats/>
                    {userChats?.length < 1 ? null : (
                        <div className='user_chats'>
                            <h3>your chats:</h3>
                            {isUserChatsLoading && <p>Loading chats...</p>}
                                {userChats?.map((chat, index) => {
                                    return(
                                        <div
                                            className={`user_chat ${selectedChat === chat ? 'selected' : ''}`}
                                            key={index}
                                            onClick={() => handleChatClick(chat)}
                                        >
                                            <UserChat chat={chat} user={user}  key={index} onClick={() => updateCurrentChat(chat)}/>
                                        </div> //+1?
                                    )
                                })}
                        </div>
                    )}
                    <button
                        className="hide_users_sidebar_btn"
                        onClick={() => setSidebarOpen((open) => !open)}
                    >
                        hide users
                    </button>
                </div>
                <ChatBox/>
            </main>
            <div className='bottom_pillow'></div>
        </>
    );
}

export default Chat;
