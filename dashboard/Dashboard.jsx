import './Dashboard.css';
import Navbar from './navigaton-bar/Navbar';
import MainContent from './MainContent/MainContent';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Profile from './dashboard-components/Profile';

import { io } from 'socket.io-client';

export const socket = io("http://localhost:3000", {
    autoConnect : false
});


function Dashboard() {
    const data = useLocation().state;
    const [newMessage, setNewMessage] = useState(0);
    
    useEffect(() => {
        socket.auth = {username : data.username};
        socket.connect();
        console.log("connected");
    }, []);

    const [btnValue, setBtnValue] = useState("home");
    const [isProfile, setIsProfile] = useState(false);
    const [searchedUser, setSearchedUser] = useState({});

    socket.io
    useEffect(() => {
        socket.on("user-message", (data) => {
            // console.log(data);
            setNewMessage(newMessage+1);
        })
    }, [])

    const handleCallback = useCallback((navBtnValue) => {
        setBtnValue(navBtnValue);
    }, [setBtnValue]);
    
    return (
        <div className="dashboard-app">
            <div className="userDashboard">
                { 
                    isProfile ? 
                    <div>
                        <Profile userInfo = {{userData : searchedUser}} searchUserFn = {{"fn1" : setIsProfile, "fn2" : setSearchedUser}} currentUser = {data}/>
                    </div> 
                    : <></>
                }
                <Navbar handleNavBtn = {handleCallback} searchUserFn = {{"fn1" : setIsProfile, "fn2" : setSearchedUser}}/>
                <div className="dashboard-content">
                    <MainContent value = {btnValue} userData = {data} newMessage = {[newMessage, setNewMessage]}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;