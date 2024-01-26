import './Signup.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from '../../Loading/Loading';

function Signup() {
    const navigate = useNavigate();
     const [emailVal, setEmailVal] = useState("");
     const [nameVal, setNameVal] = useState("");
     const [usernameVal, setUsernameVal] = useState("");
     const [passwordVal, setPasswordVal] = useState("");
     const [errorMsg, setErrorMsg] = useState({
        email : "",
        fullname : "",
        username : "",
        password : ""
     });
     let userInfo;
     const [isLoading, setIsLoading] = useState(false);

    const handleEmailInput = (e) => {
        setEmailVal(e.target.value);
    };

    const handleNameInput = (e) => {
        setNameVal(e.target.value);
    }; 

    const handleUsernameInput = (e) => {
        setUsernameVal(e.target.value);
    };

    const handlePasswordInput = (e) => {
        setPasswordVal(e.target.value);
    };

    const checkValidation = () => {
        let result = true;
        if(passwordVal.length < 5 )
        {
            setErrorMsg({...errorMsg, password : "Password can't be less than 5 characters!"});
            result = false;
        }
        if(usernameVal.length < 5)
        {
            setErrorMsg({...errorMsg, username : "Username can't be less than 5 characters!"});
            result = false;
        }
        if(nameVal.length == 0)
        {
            setErrorMsg({...errorMsg, fullname : "This field can't be empty!"});
            result = false;
        }
        if(!(emailVal.endsWith("@gmail.com")))
        {
            setErrorMsg({...errorMsg, email : "Invalid email format!"});
            result = false;
        }
        if(emailVal.length == 0)
        {
            setErrorMsg({...errorMsg, email : "This field can't be empty!"});
            result = false;
        }
        return result;
        
    };

    
    const handleSignUpBtn = () => {
        let isSignUp = checkValidation();
        if(isSignUp == true)
        {
            fetch("http://localhost:3000/signup/data/", {
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json" 
                },
                body : JSON.stringify({
                    "email" : emailVal,
                    "fullname" : nameVal,
                    "username" : usernameVal,
                    "password" : passwordVal
                })
            }).then((response) => {
                return response.json();
            }).then((response) => {
                if(response == true)
                {
                    userInfo = {
                        username : usernameVal
                    };

                    navigate("/Dashboard", {state : userInfo});

                }
                else
                {
                    setErrorMsg({
                        ...errorMsg,
                        username : "Account already exists"
                    });
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    };

    return (
        <>
        {isLoading ? <Loading /> :
        <div className="loginContainer">
            <div className="loginCard signupCard">
                <div className="heading signupHeading">
                    <h2>Signup Form</h2>
                </div>
                <form className="loginForm signupform">
                    <div className="email signup-err-m">
                        <label htmlFor="emailId">Email</label>
                        <input type="text" placeholder="Enter email" id="emialId" onChange={handleEmailInput} />
                        <p className='errorMssg'>{errorMsg.email}</p>  
                    </div>
                    <div className="fullname signup-err-m">
                        <label htmlFor="fullnameId">Fullname</label>
                        <input type="text" placeholder="Enter full name" id="fullnameId" onChange={handleNameInput} />
                        <p className='errorMssg'>{errorMsg.fullname}</p>  
                    </div>
                    <div className="username signupUsername signup-err-m signup-input-m">
                        <label htmlFor="usernameId">Username</label>
                        <input type="text" placeholder="Enter username" id="usernameId" onChange={handleUsernameInput} />
                        <p className='errorMssg'>{errorMsg.username}</p>  
                    </div>
                    <div className="password signup-err-m signup-input-m">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Create password" onChange={handlePasswordInput} />
                        <p className='errorMssg'>{errorMsg.password}</p>  
                    </div>
                    <div className="signupBtn">
                        <button className="loginBtn signupBtn" type="button" onClick={handleSignUpBtn}>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
        }
        </>
    )
}

export default Signup;