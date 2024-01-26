import { useLocation } from "react-router-dom";
import "./Chat.css"
import { useEffect, useState } from "react";


function ChatsContent({chatFn}){

    const myUsername = useLocation().state;
    const [chatList, setChatList] = useState([]);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/users/chat/profile/image/${myUsername.username}/${chatFn[2]}`, {
            method : "GET"
        }).then((response) => {
            return response.json();
        }).then((response) => {
            // console.log(response);
            setProfiles(response);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/user/chat/chats/list", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify({
                "username" : myUsername.username,
                "chat_with" : chatFn[2]
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            // console.log(response);
            setChatList(response);
        }).catch((err) => {
            console.log(err);
        })
    }, [chatFn[4][0]], chatFn[2]);

    return (
        <div className="chats-content">
            <div className="chats-content-container">
                
                {
                    chatList.map((chat, index) => 
                        chat[myUsername.username] ? 
                            <div className="chats-my-message-container" key={index}>
                                <div className="chat-main-message">
                                    <p>{Object.values(chat)[0]}</p>
                                </div>
                                <div className="chat-message-user-profile">
                                    <img src={profiles[0]} alt="" />
                                </div>
                            </div>
                            :
                            <div className="chats-from-message-container"  key={index}>
                                <div className="chat-message-user-profile">
                                    <img src={profiles[1]} alt="" />
                                </div>
                                <div className="chat-main-message">
                                    <p>{Object.values(chat)[0]}</p>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    )
}

export default ChatsContent;