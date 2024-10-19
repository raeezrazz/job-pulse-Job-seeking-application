import {Route ,Routes} from "react-router-dom"
import AdminLogin from "../Pages/AdminSide/AdminLogin"

function AdminRouter() {
  return (
    <Routes>
        <Route path="/login" element={<AdminLogin/>} />
    </Routes>
  )
}

export default AdminRouter
