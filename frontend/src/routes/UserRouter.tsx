import { Route, Routes } from "react-router-dom";
import Home from '../Pages/UserSide/Home';
import Login from "../Pages/UserSide/Login";
import Profile from "../Pages/UserSide/Profile";
import JobPreference from "../Pages/UserSide/JobPreference";

function UserRouter() {
  return (
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/job-preference' element={<JobPreference/>}/>

   </Routes>
  )
}

export default UserRouter
