import "./Profile.css";
import { useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../Loading/Loading";
import {storage} from "../../../firebase";
import { getDownloadURL, ref , uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function Profile(props) {
    // console.log(props);
    const myData = useLocation().state;
    const [profile, setProfile] = useState(false);
    const [editBtn, setEditBtn] = useState(false);
    const [userData, setUserData] = useState({});
    const [profilePosts, setProfilePosts] = useState(true);
    const [isEditBtn, setIsEditBtn] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const [followVal, setFollowVal] = useState("");
    const [isSettings, setIsSettings] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const [postLink, setPostLink] = useState("");

    useEffect(() => {
        if(props.userInfo.value == "profile")
        {
            setIsEditBtn(true);
        }
    }, []);

    const handleEditBtn = (event) => {
        if(event.target.value == "edit profile")
        {
            setEditBtn(true);
        }
        else if(followVal == "Follow")
        {
            fetch("http://localhost:3000/api/user/follow", {
            method : "POST", 
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                currentUser : props.currentUser.username,
                searchedUser : props.userInfo.userData.username 
            })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                // console.log(data);
                setFollowVal("Unfollow");
                setIsFollow(true);
            }).catch((err) => {
                console.log(err);
            })
        }
        else if(followVal == "Unfollow")
        {
            fetch("http://localhost:3000/api/user/unfollow", {
            method : "DELETE", 
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                currentUser : props.currentUser.username,
                searchedUser : props.userInfo.userData.username 
            })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                // console.log(data);
                setFollowVal("Follow");
                setIsFollow(false);
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/user_data", {
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(props.userInfo.userData)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        // console.log(data);
        setUserData(data);
        if(data.posts.length == 0)
        {
            setProfilePosts(false);
        }
        setProfile(true);
    });

    if(props.currentUser)
    {
        fetch("http://localhost:3000/api/data/searchedUser", {
            method : "POST", 
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                currentUser : props.currentUser.username,
                searchedUser : props.userInfo.userData.username 
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // console.log(data);   
            if(data)
            {
                setFollowVal("Unfollow");
                setIsFollow(true);
            }
            else
            {
                setFollowVal("Follow");
                setIsFollow(false);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    }, [deletePost])

    const handleCrossBtn = () => {
        Object.values(props.searchUserFn)[0](false);
    };

    const handleMessageClick = () => {
        fetch(`http://localhost:3000/api/user/chats/${myData.username}/${userData[0].username}`, {
            method : "GET"
        }).then((response) => {
            //
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <>
        {profile ? <div className="profile-page">
        <div className="profile-page-upper-container">
            <div className="profile-header">
                <h3>Profile</h3>
                {
                    !isEditBtn ? 
                    <svg  onClick={() => {handleCrossBtn()}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-gear-wide-connected" viewBox="0 0 16 16" onClick={() => {setIsSettings(true)}}>
                    <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
                    </svg>
                }
            </div>
            <div className="profile-name">
                <div className="profile-name-detail">
                    <p>@{userData[0].username}</p>
                    <h2>{userData[0].fullname}</h2>
                </div>
                <div className="profile-image">
                    <img src={userData[0].profile_pic_link} />
                </div> 
            </div>
        </div>
        {
            editBtn ? 
            <EditDialogBox btnVal = {{val : "editBtn", fn : setEditBtn}}/> 
            : isSettings ?
                <EditDialogBox btnVal = {{val : "settings", fn : setIsSettings}}/>
                : deletePost ?
                    <EditDialogBox btnVal = {{val : "delete-post", fn : setDeletePost, postUrl : postLink}} />
                    : <></>
        }   
        <div className="profile-page-lower-container">
            <div className="profile-follower-container">
                <div className="follow-info">
                    <div className="posts profile-user-detail">
                        <p className="count-detail">{Object.values(userData.postsCount[0])[0]}</p>
                        <p className="detail-text">Posts</p>
                    </div>
                    <div className="follower-count profile-user-detail">
                        <p className="count-detail">{Object.values(userData.followerInfo[0])[0]}</p>
                        <p className="detail-text">Followers</p>
                    </div>
                    <div className="following-count profile-user-detail">
                        <p className="count-detail">{Object.values(userData.followingInfo[0])[0]}</p>
                        <p className="detail-text">Following</p>
                    </div>
                </div>
            </div>
            <div className="profile-main-btn">
                {
                    isEditBtn ? 
                        <button onClick={handleEditBtn} value={"edit profile"}>Edit profile</button>
                        :
                        <>
                            <button onClick={handleEditBtn} value={followVal}>{followVal}</button>
                            <button onClick={handleMessageClick}>Message</button>
                        </>
                }   
            </div>
            <div className="user-posts">
                <div className="main-post-container">
                    { 
                        isEditBtn || isFollow ?  
                            profilePosts ? 
                                userData.posts.map((post, index) => 
                                    <div className="post-item" key={index}>
                                        <img src={post.post_link} onClick={() => {setDeletePost(true); setPostLink(post.post_link)}}/>
                                    </div>
                                ) : <p>No Posts</p>
                            : <p>Follow to see their posts...</p>
                    }
                </div>
            </div>
        </div>
    </div> : <Loading />}
    </> 
    )
}

function EditDialogBox(props) {
    // console.log(props);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.state.username);
    const handleDeletePostBtn = () => {
        fetch("http://localhost:3000/api/user/delete-post", {
            method : "DELETE",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : location.state.username,
                url : props.btnVal.postUrl
            })
        }).then((response) => {
            props.btnVal.fn(false);
            alert("Deleted!!");
        }).catch((err) => {
            console.log(err);
        })
    };

    const sendUrlToDb = (url) => {
        fetch("http://localhost:3000/api/user/profile/picture", {
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
    }

    const editProfilePic = (e) => {
        const file = e.target.files[0];
        if(file.name.endsWith(".png") || file.name.endsWith(".jpg") || file.name.endsWith(".jpeg"))
        {
            const imageRef = ref(storage, `images/${file.name + v4()}`);
            uploadBytes(imageRef, file)
            .then((response) => {
            // console.log("Uploaded");
            getDownloadURL(response.ref)
            .then((url) => {
                // console.log(url);
                sendUrlToDb(url);
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

    return(
        <div className="editBox">
            <div className="edit-dialog-box">
                <div className="exit-edit-dialog-box" onClick={() => props.btnVal.fn(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
                {
                    props.btnVal.val == "editBtn" ?
                    <>
                    <button className="loginBtn edit-dialog-box-item" type="button">Edit username</button>
                    <button className="loginBtn edit-dialog-box-item" type="button">Edit fullname</button>
                    <button className="loginBtn edit-dialog-box-item" type="button" onChange={editProfilePic} id="edit-profile-btn">
                        <p>Edit profile picture</p>
                        <input type="file" />
                    </button>
                    </>
                    : props.btnVal.val == "settings" ?
                        <>
                        <button className="loginBtn edit-dialog-box-item" type="button" onClick={() => {navigate('/'); }}>Log out</button>
                        </>
                        : props.btnVal.val == "delete-post" ?
                            <>
                            <button className="loginBtn edit-dialog-box-item" type="button" onClick={handleDeletePostBtn}>Delete post</button>
                            </>
                            :
                            <></>
                }
            </div>
        </div>
    );
             
}

export default Profile;