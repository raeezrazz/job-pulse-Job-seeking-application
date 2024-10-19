import { Route, Routes } from "react-router-dom";
import Home from '../Pages/UserSide/Home';
import Login from "../Pages/UserSide/Login";

function UserRouter() {
  return (
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />

   </Routes>
  )
}

export default UserRouter
