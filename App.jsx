import './App.css'
import  Login from './login/Login'
import Signup from './signup/Signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './dashboard/Dashboard'

function App() {

  return (
    <>
      <Router>
        <Routes> 
         <Route path='/' Component={Login}/>
         <Route path='/Signup' Component={Signup}/>
         <Route path="/Dashboard" Component={Dashboard}/>
        </Routes>
      </Router>
    </>
  )
}

export default App