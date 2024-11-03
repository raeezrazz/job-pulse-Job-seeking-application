import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Rootstate } from "../../store/store";
import { useSelector } from "react-redux";
import { getUserData } from "../../api/userApi";
import { useAuth } from "../hooks/UserAuth";


export default function Header() {
  const { isAuthenticated, user, isLoading, isError, logout } = useAuth();  
  console.log("herein  header",isAuthenticated,user)
  const navigate = useNavigate();

  // const userInfo = useSelector((state: Rootstate) => state.user.userInfo);
  // console.log(userInfo, "user infoansdjgnajsdnvjasnvjas");



  return (
    <header className="sticky top-0 z-10 px-4 lg:px-6 h-16 flex items-center bg-white shadow-lg">
      {/* <button onClick={()=> getUserData()}>get user</button> */}
      <a className="flex items-center justify-center" href="#">
        <MapPin className="h-6 w-6" />
        <span onClick={()=>navigate('/')} className="ml-2 text-lg font-bold">Job Pulse</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Find Jobs
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
          How it Works
        </a>
        {isAuthenticated ? (
          <a
            onClick={() => navigate('/profile')}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Profile
          </a>
        ) : (
          <a
            onClick={() => navigate('/login')}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Sign In
          </a>
        )}
      </nav>
    </header>
  );
}
