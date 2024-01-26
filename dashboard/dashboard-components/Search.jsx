import { useState } from "react";
import "./Search.css";

function Search(props){
    const [userData, setUserData] = useState([]);
    const [isSearch, setIsSearch] = useState(true);

    const handleSearch = (event) => {
        if(event.target.value == "")
        {
            setUserData([]);
        }
        else
        {
            fetch("http://localhost:3000/api/search/user_profile", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : event.target.value
            })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                setUserData(data);
            })
        }
    };

    const handleSearchedAccClick = (data) => {
        Object.values(props.searchUserFn)[0](true);
        Object.values(props.searchUserFn)[1](data);
        setIsSearch(false);
    };

    return (
        <>
        {
            isSearch ?
            <div className="search-container">
                <input type="text" placeholder="Search" onChange={handleSearch}/>
                <div className="search-info">
                    {
                        userData.map((data, id) => 
                            <div className="search-account-container" key={id} onClick={() => handleSearchedAccClick(data)}>
                                <div className="home-page-posts-info" >
                                    <img src={data.profile_pic_link} />
                                    <p>{data.username}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        : <></>
        }
        </>
    )
}

export default Search;