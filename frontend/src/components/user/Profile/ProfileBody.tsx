import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rootstate } from "../../../store/store";
import EditProfileModal from "../../common/modals/EditProfileModalProps";
import { logout, setCredentials } from "../../../store/slice/userSlice";
import { changePassword, updateUserDetails, getUserData, logoutUser } from "../../../api/userApi";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/UserAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserUpdateForm } from "../../../interfaces/UserInterfaces";
import { faUserCircle, faLightbulb, faLock, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function ProfileBody() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>("Profile");
  const [changePasswordSection, setChangePasswordSection] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuthenticated, user, isLoading, isError } = useAuth();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (updatedInfo: UserUpdateForm) => {
    try {
      const updatedDataIncludingEmail = { ...updatedInfo, email: user?.email };
      const response = await updateUserDetails(updatedDataIncludingEmail);
      dispatch(setCredentials(response.data));
      closeModal(); // Close modal after saving
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const logoutHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logoutUser();
    navigate("/login");
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill all fields");
      return;
    }
    if (!validatePassword(newPassword)) {
      setErrorMessage(
        "New Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New Passwords do not match");
      return;
    }

    try {
      const response = await changePassword(user?.email, currentPassword, newPassword);
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

  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="fixed top-16 left-0 h-screen w-64 bg-white shadow-md z-10">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">My Account</h2>
          <nav className="bg-white shadow-md p-4 rounded-lg w-full max-w-xs">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setActiveTab("Profile")}
                  className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="text-lg mr-3" />
                  <span className="font-medium">Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("Skills")}
                  className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faLightbulb} className="text-lg mr-3" />
                  <span className="font-medium">Skills</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("accountSettings")}
                  className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faLock} className="text-lg mr-3" />
                  <span className="font-medium">Account Settings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="flex items-center w-full text-red-500 p-3 rounded-lg hover:bg-red-50 transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-lg mr-3" />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="ml-64 p-8 ">
        {/* Profile Tab */}
        {activeTab === "Profile" && (
          <div>
            <p className="text-2xl font-bold">Profile Management</p>
            <p className="text-gray-600 mb-2">Manage your Profile</p>

            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden">
                <img src={user?.profilePicture || ""} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-500 text-sm">{user?.bio || "No bio yet: Add a bio to tell others more about you!"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-20">DOB:</span>
                <span className="text-sm text-gray-800">
                  {user?.dob ? new Date(user?.dob).toLocaleDateString("en-US") : "Not provided"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-20">Email:</span>
                <span className="text-sm text-gray-800">{user?.email}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-20">Phone:</span>
                <span className="text-sm text-gray-800">{user?.phone || "Not provided"}</span>
              </div>
            </div>

            <button
              onClick={openModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300"
            >
              Edit Details
            </button>
            <EditProfileModal isOpen={isModalOpen} onClose={closeModal} userInfo={user} onSave={handleSave} />
          </div>
        )}

        {/* Account Settings Tab */}
        {activeTab === "accountSettings" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition duration-300"
              onClick={() => setChangePasswordSection(!changePasswordSection)}
            >
              Change Password
            </button>
            {changePasswordSection && (
              <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="text-sm font-medium text-gray-600">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="text-sm font-medium text-gray-600">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfileBody;
