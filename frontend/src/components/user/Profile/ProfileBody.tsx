import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rootstate } from "../../../store/store";
import EditProfileModal from "../../common/modals/EditProfileModalProps";
import { logout, setCredentials } from "../../../store/slice/userSlice";
import { changePassword } from "../../../api/userApi";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateUserDetails ,getUserData } from "../../../api/userApi";
import { UserUpdateForm } from "../../../interfaces/UserInterfaces";
import { faUserCircle, faLightbulb, faLock, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function ProfileBody() {

  // Call the async function

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userInfo:any
  const fetchAllData = ()=>{
    userInfo = useSelector((state: Rootstate) => state.user.userInfo);
  }
  
  console.log("here is the userInfo",userInfo)
  fetchAllData()
  const [activeTab, setActiveTab] = useState<string>("Profile");
  const [changePasswordSection, setChangePasswordSection] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Modal state for editing profile
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  //Modal ------------------------------------------

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (updatedInfo:UserUpdateForm) => {
    
    const updatedDataIncludingEmail = {...updatedInfo , email:userInfo?.email}

    const response = await updateUserDetails(updatedDataIncludingEmail)
    console.log("here si the t",response)
    // fetchAllData()

    // closeModal(); // Close modal after saving
  };

  //-------------------------------

  const logoutHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill all fields");
      return;
    }
    if (!validatePassword(newPassword)) {
      setErrorMessage("New Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New Passwords do not match");
      return;
    }

    try {
      const response = await changePassword(userInfo.email, currentPassword, newPassword);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "Your password has been changed successfully!",
          timer: 3000,
          showConfirmButton: false,
        });
        setChangePasswordSection(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }

    

  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if(userInfo?.email){
          console.log(userInfo.email)
          const userData = await getUserData(userInfo?.email);
          console.log("here is the userInfo",userData)
          const setCred = await dispatch(setCredentials(userData.data))
          // console.log(setCred)
          fetchAllData()
  
        }
       
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
  
    fetchUserData(); 
      }, [userInfo?.email]); // Dependency array to rerun effect when email changes

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="fixed top-16 left-0 h-screen w-64 bg-white shadow-md z-10">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">My Account</h2>
          <nav className="bg-white shadow-md p-4 rounded-lg w-full max-w-xs">
            <ul className="space-y-4">
              <li>
                <button onClick={() => setActiveTab("Profile")} className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faUserCircle} className="text-lg mr-3" />
                  <span className="font-medium">Profile</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("Skills")} className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faLightbulb} className="text-lg mr-3" />
                  <span className="font-medium">Skills</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("accountSettings")} className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faLock} className="text-lg mr-3" />
                  <span className="font-medium">Account Settings</span>
                </button>
              </li>
              <li>
                <button onClick={logoutHandler} className="flex items-center w-full text-red-500 p-3 rounded-lg hover:bg-red-50 transition duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-lg mr-3" />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="ml-64 p-8 ">
        {activeTab === "Profile" && (
          <div className="">
            <p className="text-2xl font-bold">Profile Management</p>
            <p className="text-gray-600 mb-2">Manage your Profile</p>
            <div className="w-16 h-1 mx-auto mt-4"></div>

            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden">
                <img src={userInfo.profileImage } alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1).toLowerCase()}</h2>
                <p className="text-gray-500 text-sm">{userInfo.bio || "No bio yet: Add a bio to tell others more about you!"}</p>
              </div>
            </div>

            

            <div className="space-y-4"> 
            <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-20">DOB:</span>
                <span className="text-sm text-gray-800">{userInfo.dob ? new Date(userInfo.dob).toLocaleDateString('en-US') : "Not provided"}
</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-20">Email:</span>
                <span className="text-sm text-gray-800">{userInfo.email}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-20">Phone:</span>
                <span className="text-sm text-gray-800">{userInfo.phone || "Not provided"}</span>
              </div>
            </div>

            <div>
              <button onClick={openModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300">
                Edit Details
              </button> 
              <EditProfileModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                userInfo={userInfo} 
                onSave={handleSave} 
              />
            </div>
          </div>
        )}

        {activeTab === "Skills" && (
          <div>
            <p className="text-2xl font-bold">Skills Management</p>
            <p className="text-gray-600 mb-2">Manage your Skills</p>
            <div className="w-16 h-1 mx-auto mt-4"></div>

            <p>Your current skills: {userInfo.skills?.join(", ") || "No skills added yet."}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300">
              Add Skills
            </button>
          </div>
        )}

        {activeTab === "accountSettings" && (
          <div>
            <p className="text-2xl font-bold">Account Settings</p>
            <p className="text-gray-600 mb-2">Change your password</p>

            <button onClick={()=>setChangePasswordSection(!changePasswordSection)}  className="bg-blue-500 mb-4 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300">
                Change Password
              </button>


            {changePasswordSection && (<form onSubmit={handleChangePassword} className="space-y-4">
              {errorMessage && <div className="text-red-600">{errorMessage}</div>}
              <div>
                <label className="block text-sm font-medium">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  required 
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300">
                Submit
              </button>
            </form>)}
            <div className="w-16 h-1 mx-auto mt-4"></div>

            
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfileBody;
