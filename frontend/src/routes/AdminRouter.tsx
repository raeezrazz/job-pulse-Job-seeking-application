import {Route ,Routes} from "react-router-dom"
import AdminLogin from "../Pages/AdminSide/AdminLogin"
import AdminHome from "../Pages/AdminSide/AdminHome"
function AdminRouter() {
  return (
    <Routes>
        <Route path="/login" element={<AdminLogin/>} />
        <Route path='/' element={<AdminHome/> }/>
    </Routes>
  )
}

export default AdminRouter
