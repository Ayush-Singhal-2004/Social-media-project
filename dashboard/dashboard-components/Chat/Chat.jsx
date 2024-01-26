import { useState, useEffect } from 'react';
import './Chat.css'
import Chats from './Chats';
import ChatSearch from './ChatSearch';
import { useLocation } from 'react-router-dom';

function Chat(props) {
    // console.log(props.id.newMessage);
    const data = useLocation().state;
    const [showChat, setShowChat] = useState(false);
    const [chatUsername, setChatUsername] = useState("");
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/user/chat/chat_list", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : data.username
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            // console.log(response);
            let chats = [];
            response.map((chat) => chats.push(chat.chat_with))
            setChatList(chats);
        }).catch((err) => {
            console.log(err);
        })
    }, [props.id.newMessage[1]]);

    return (
        <div className="Chat">
            <div className="chat-container">
                <ChatSearch chatFn = {[showChat, setShowChat, chatUsername,setChatUsername, chatList, props.id.newMessage]} />
                <Chats chatFn = {[showChat, setShowChat, chatUsername,setChatUsername, props.id.newMessage]} />
            </div>
        </div>
    )
}

export default Chat;