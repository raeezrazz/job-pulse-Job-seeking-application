import { Route, Routes } from "react-router-dom";
import Home from '../Pages/UserSide/Home';
import Login from "../Pages/UserSide/Login";
import Profile from "../Pages/UserSide/Profile";


function UserRouter() {
  return (
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/profile' element={<Profile/>}/>
   </Routes>
  )
}

export default UserRouter
