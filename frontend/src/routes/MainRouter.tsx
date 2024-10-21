import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';

function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/*' element={<UserRouter/>} />
        <Route path='/admin/*' element={<AdminRouter/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default Router
