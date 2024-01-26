import './Chat.css'
import ChatSearchNav from './ChatSearchNav';

function ChatSearch (props){

    return (
        <div className="chat-search">
            <div className="chat-search-container">
                <ChatSearchNav chatFn = {props.chatFn} />
            </div>
        </div>
    )
}

export default ChatSearch;