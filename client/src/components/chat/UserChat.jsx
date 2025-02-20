import {useFetchRecipientUser} from "../../hooks/useFetchRecipient.js";
import {ChatContext} from "../../context/ChatContext.jsx";
import {useContext} from "react";

const UserChat = ({chat, user}) => {
    const {recipientUser} = useFetchRecipientUser(chat, user);
    const {onlineUsers} = useContext(ChatContext);

    const isOnline = onlineUsers?.some((user) => user?.userId ===recipientUser?._id)

    // console.log("UserUserChat", recipientUser)

    return (
        <>
            <div className={"inner_user_chat"}>
                {recipientUser?.name}
                <small className={isOnline? 'user_online' : 'user_offline'}> Online</small>
            </div>
            {/*<hr/>*/}
        </>
    );
};

export default UserChat;