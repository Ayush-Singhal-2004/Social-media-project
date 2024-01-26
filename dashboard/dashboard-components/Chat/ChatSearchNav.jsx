import './Chat.css'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

function ChatSearchNav(props){

    // console.log(props.chatFn);
    const data = useLocation().state;
    const [username, setUsername] = useState("");
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        //TODO : get fullname of this account
        fetch(`http://localhost:3000/api/fullname/${data.username}`,{
            method : "GET"
        }).then((response) => {
            return response.text();
        }).then((data) => {
            // console.log(data);
            setUsername(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        props.chatFn[4].map((chat) => {
            fetch(`http://localhost:3000/api/search/user_profile`, {
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    "username" : chat
                })
            }).then((response) => {
                return response.json();
            }).then((response) => {
                // console.log(response);
                const data = response.find((data) => data.username == chat);
                setChatList(prevChat => [...prevChat, data])
            }).catch((err) => {
                console.log(err);
            })
        })
    }, [props.chatFn[4]]);

    const handleChatClick = (username) => {
        // console.log(username);
        let x = window.matchMedia("(max-width: 570px)")
        props.chatFn[1](true);
        props.chatFn[3](username);
        props.chatFn[5][1](props.chatFn[5][0] + 1);
        if(x.matches)
        {
            document.getElementById("chat-id").style.display = "none";
            document.getElementById("chat-part-id").style.display = "block";
        }
    };

    return (
        <div className="chat-search-nav" id='chat-id'w>
            <div className="chat-nav-container">
                <div className="chat-nav-head">
                    <h3>{username}</h3>
                </div>
                <p>Messages</p>
                {/* Chat list */}
                <div className="chat-search-chats">
                    {
                        chatList.map((chat, index) => 
                        <div className="chat-searched-items" onClick={() => {handleChatClick(chat.username)}} key={index}>
                            <img src={chat.profile_pic_link} alt="" />
                            <div className="chat-searched-info">
                                <p>{chat.username}</p>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ChatSearchNav