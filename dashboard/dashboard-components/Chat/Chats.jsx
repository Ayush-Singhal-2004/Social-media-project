import { useEffect, useState } from 'react';
import './Chat.css'
import ChatsContent from './ChatsContent';

import { socket } from '../../Dashboard';
import { useLocation } from 'react-router-dom';

function Chats ({chatFn}){

    // console.log(chatFn[4]);
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState("");
    const username = useLocation().state.username;

    useEffect(() => {
        // fetch fullname from username
        if(chatFn[2].length > 5)
        {
            fetch(`http://localhost:3000/api/user_data`,{
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({username : chatFn[2]})
            }).then((response) => {
                return response.json();
            }).then((data) => {
                // console.log(Object.values(data)[0]);
                setUserData(Object.values(data)[0]);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [chatFn[2]]);

    const handleSendBtn = () => {
        if(socket.connected)
        {
            socket.emit("message",{
                "from" : username,
                "to" : chatFn[2],
                "message" : message
            })
            chatFn[4][1](chatFn[4][0]+1);
        }
        setMessage("");
    };

    return (
        <div className="chats-part" id='chat-part-id'>
            <div className="chats-part-container">
                {
                    chatFn[0] ? 
                        <>
                        <div className="chats-part-head">
                            <div className="chat-username">
                                {
                                    userData ?
                                        <img src={userData?.profile_pic_link} alt="" />
                                        : <></>
                                }
                                <h3>{userData?.fullname}</h3>
                            </div>
                            <div className="inner-chat-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </div>
                        </div>
                        <div className="chats-main-container">
                            {/* Main chat */}
                            <ChatsContent chatFn = {chatFn} />
                        </div>
                        <div className="chat-input-container">
                            <input type="text" placeholder='Type something...' value={message} onChange={(e) => setMessage(e.target.value)} />
                            <div className='chat-send-btn-container'>
                                <button onClick={handleSendBtn}>Send</button>
                            </div>
                        </div>
                        </>
                    :
                    <div className="noChat-selected-container">
                        <img src="https://media.tenor.com/Wx9IEmZZXSoAAAAi/hi.gif" alt="" />
                        <p>Chat with your friends!!</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Chats;