import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../../Loading/Loading';

function Login() {
    let errorValues = {usernameErr : "", passwordErr : ""};
    const navigate = useNavigate();
    const [usernameVal, setUsernameVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [errorMsg, setErrorMsg] = useState(errorValues);
    const [isLoading, setIsLoading] = useState(false);
    let userInfo;

    const handleUsernameInput = (event) => {
        setUsernameVal(event.target.value);
    };

    const handlePasswordInput = (event) => {
        setPasswordVal(event.target.value);
    };

    const handleLoginClick = (e) => {
        let canLogin = false;
        
        if(usernameVal.length >= 5 && passwordVal.length >= 5)
        {
            canLogin = true;
        }
        else
        {
            if(usernameVal.length == 0 && passwordVal.length == 0)
            {
                setErrorMsg({...errorMsg, usernameErr:"Username field can't be empty!", passwordErr : "Password field can't be empty!"});
            }
            else if(usernameVal.length <5 && passwordVal.length >=5)
            {
                setErrorMsg({...errorMsg, usernameErr:"Username can't be less than 5 characters!", passwordErr : ""});
            } 
            else if(usernameVal.length >=5 && passwordVal.length <5)
            {
                setErrorMsg({...errorMsg, usernameErr:"", passwordErr : "Password can't be less than 5 characters!"});
            }
            else if(usernameVal.length <5 && passwordVal.length <5)
            {
                setErrorMsg({...errorMsg, usernameErr:"Username can't be less than 5 characters!", passwordErr : "Password can't be less than 5 characters!"});
            }
        }
        if(canLogin == true)
        {
            setIsLoading(true);
            fetch("http://localhost:3000/login/data/",{
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    username : usernameVal,
                    password : passwordVal
                })
            }).then((response) => {
                return response.json();
            }).then((response) => {
                setIsLoading(false);
                if(response == true)
                {
                    userInfo = {
                        username : usernameVal
                    }

                    navigate("./dashboard", {state : userInfo});
                }
                else
                {
                    setErrorMsg({
                        ...errorMsg,
                        passwordErr : "Invalid username or password"
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    return (
        <>
        {isLoading ? <Loading /> : 
        <div className="loginContainer">
            <div className="loginCard">
                <div className="heading">
                    <h2>Login Form</h2>
                </div>
                <form className="loginForm">
                    <div className="username">
                        <label htmlFor="usernameId">Username</label>
                        <input type="text" placeholder="Enter username" id="usernameId" value={usernameVal} onChange={handleUsernameInput}/>
                        <p className='errorMssg'>{errorMsg.usernameErr}</p>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter password" value={passwordVal} onChange={handlePasswordInput}/>
                        <p className='errorMssg'>{errorMsg.passwordErr}</p>
                    </div>
                    <button className="loginBtn" type="button" onClick={handleLoginClick}>Login</button>
                    <Link to="/Signup" className="newAcc">Don't have an account?</Link>
                </form>
            </div>
        </div>
            }  
        </>
    )
}

export default Login;