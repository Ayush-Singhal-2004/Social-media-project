import { useEffect, useState } from "react";
import "./Navbar.css";
import Search from "../dashboard-components/Search";
import {storage} from "../../../firebase";
import { getDownloadURL, ref , uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";

function Navbar(props) {
    const location = useLocation();
    // console.log(location.state.username);
    const [navBtnVal, setNavBtnVal] = useState("home");
    const [isSearch, setIsSearch] = useState(false);

    const handleSearchBtn = () => {
        setIsSearch(!isSearch);
    };

    useEffect(() => {
        props.handleNavBtn(navBtnVal);
    });

    const sendFileUrl = (url) => {
        fetch("http://localhost:3000/api/user/post/picture", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : location.state.username,
                url : url
            })
        }).then((response) => {
            // console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    };
    const uploadFile = (e) => {

        const file = e.target.files[0];
        if(file.name.endsWith(".png") || file.name.endsWith(".jpg"))
        {
            const imageRef = ref(storage, `images/${file.name + v4()}`);
            uploadBytes(imageRef, file)
            .then((response) => {
            // console.log("Uploaded");
            getDownloadURL(response.ref)
            .then((url) => {
                // console.log(url);
                sendFileUrl(url);
                alert("Uploaded!!");
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
        }
        else 
        {
            console.log(false);
            return;
        }
    };

    return (
        <>
        <nav className="navbar">
           <div className="nav-content">
                <div className="home-icon nav-icon" onClick={(e) => setNavBtnVal("home")} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-house-fill set-icon-size" viewBox="0 0 16 16" >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                    </svg>
                    <p className="nav-icon-content">Home</p>
                </div>
                <div className="search-icon nav-icon" onClick={handleSearchBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-search set-icon-size" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <p className="nav-icon-content">Search</p>
                </div>
                <div className="add-icon nav-icon navbar-add-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    <input type="file" accept="image/*"  onChange={uploadFile} />
                    <p className="nav-icon-content">Add</p>
                </div>
                <div className="chat-icon nav-icon" onClick={() => setNavBtnVal("chat")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-chat-dots-fill set-icon-size" viewBox="0 0 16 16">
                    <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                    <p className="nav-icon-content">Chat</p>
                </div>
                <div className="profile-icon nav-icon" onClick={() => setNavBtnVal("profile")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-person-fill set-icon-size" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                    <p className="nav-icon-content">Profile</p>
                </div>
           </div>
        </nav>
        {isSearch ? <Search  searchUserFn = {props.searchUserFn}/> : <></>}
        </>
    )
}

export default Navbar;