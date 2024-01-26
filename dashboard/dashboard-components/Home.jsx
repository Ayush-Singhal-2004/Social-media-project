import { useEffect, useState } from 'react';
import './Home.css'
import Loading from "../../../Loading/Loading";

function Home(props) {
    const [isHome, setIsHome] = useState(false);
    const [isPosts, setIsPosts] = useState(false);
    const [isNotes, setIsNotes] = useState(false);
    const [postData, setPostData] = useState([]);
    const [notesData, setNotesData] = useState([]);
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/data/following/posts", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(props.id.userData)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.data.length > 0)
            {
                setNotesData(data.data);
                setIsNotes(true);
            }
            if(data.posts.length > 0)
            {
                setPostData(data.posts);
                setIsPosts(true);
            }
            setIsHome(true);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const addUserProfilePicture = (data) => {
        fetch("http://localhost:3000/api/user_data", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((response) => {
            // console.log(response);
            if(response[0])
            {
                setProfilePic(response[0].profile_pic_link);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            {
                isHome ?
                <div className="main-home-container">
            <div className="notes-container">
                {
                    isNotes ?
                    notesData.map((data, index) =>
                        data.length > 0 ?
                        <div className="notes-item" key={index}>
                            {addUserProfilePicture(data[0])}
                            <img src={profilePic} />
                            <p className='note-content'>{data[0].note}</p>
                            <p className='note-username'>{data[0].username}</p>
                        </div>
                        : <></>
                    )
                    :
                    <></>
                }
            </div>
            <div className="home-page-post-container">
                <div className="home-page-posts">
                    {
                        isPosts ? 
                        postData.map((data, index) =>
                            data.length > 0 ?
                            data.map((subData, kyeVal) => 
                            <div className="home-posts-container" key={kyeVal}>
                                <img src={subData.post_link} />
                                <div className="home-page-posts-info">
                                    {addUserProfilePicture(subData[index])}
                                    <img src={profilePic} />
                                    <p>{subData.username}</p>
                                </div>
                            </div>
                            )
                            : <></>
                        )
                        : <p className='home-page-posts-msssg'>Follow people to see their posts...</p>
                    }
                </div>
            </div>
        </div> : <Loading />
        }
        </>
    )
}

export default Home;