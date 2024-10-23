import {useContext} from "react";
import {ChatContext} from "../context/ChatContext.jsx";
import UserChat from "../components/chat/UserChat";
import {AuthContext} from "../context/AuthContext.jsx";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox.jsx";

const Chat = () => {

    const {user} = useContext(AuthContext);

    const {
        userChats,
        isUserChatsLoading,
        updateCurrentChat,
    } = useContext(ChatContext);

    console.log('userChats',userChats);

    return (
        <>
            <main className="main_chat_page">
                <div className="users_and_chats">
                    <PotentialChats/>
                    {userChats?.length < 1 ? null : (
                        <div className='user_chats'>
                            {isUserChatsLoading && <p>Loading chats...</p>}
                                {userChats?.map((chat, index) => {
                                    return(
                                        <div key={index} onClick={() => updateCurrentChat(chat)}>
                                            <UserChat chat={chat} user={user}/>
                                        </div> //+1?
                                    )
                                })}
                        </div>
                    )}
                </div>
                <ChatBox/>
            </main>
            <div className='bottom_pillow'></div>
        </>
    );
}

export default Chat;
