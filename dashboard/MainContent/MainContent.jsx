import Home from "../dashboard-components/Home"
import Add from "../dashboard-components/Add"
import Chat from "../dashboard-components/Chat/Chat"
import Profile from "../dashboard-components/Profile"

function MainContent (props){

    return (
        <div className="main_content">
            {props.value == "home" ? <Home id = {props}/> : props.value == "add" ? <Add id = {props}/> : props.value == "chat" ? <Chat id = {props}/> : props.value == "profile" ? <Profile userInfo = {props}/> : <Home id = {props}/>}
        </div>
    )
};

export default MainContent;