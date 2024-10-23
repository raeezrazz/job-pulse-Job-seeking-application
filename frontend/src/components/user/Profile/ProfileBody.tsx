import React , {useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Rootstate } from '../../../store/store'

import { logout } from '../../../store/slice/userSlice'
import { changePassword } from '../../../api/userApi'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLightbulb, faLock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function ProfileBody() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector((state: Rootstate)=> state.user.userInfo)

    const [activeTab , setActiveTab] =useState<string>('Profile')
    const [changePasswordSection,setChangePasswordSection] = useState<boolean>(false)
    const [currentPassword , setCurrentPassword] = useState<string>('')
    const [newPassword , setNewPassword] = useState<string>('')
    const [confirmPassword , setConfirmPassword] = useState<string>('')
    const [errorMessage,setErrorMessage] = useState<string>('')


    
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const check = passwordRegex.test(password);

    return check;
  };


    const logoutHandler = ((e:any)=>{
        e.preventDefault()
        console.log("logout")
        dispatch(logout())
        navigate('/login')
    })

    const handlleCHangePassword =async (e)=>{
        e.preventDefault()
        let isError = false
        if(!currentPassword || currentPassword.trim()===''){
            setErrorMessage('Please fill all fields')
            isError = true
        }
        else if(!validatePassword(newPassword)){
            setErrorMessage("New Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.")
            isError = true
        }else if(newPassword != confirmPassword){
            setErrorMessage('New Passwords Do not Match')
            isError=true
        }
        if(!isError){
            console.log("TRue")
        
            const response = await changePassword(userInfo?.email,currentPassword,newPassword)
            console.log(response)
        }

    }


  return (
    <div className='flex min-h-screen bg-gray-100'>

        <aside className='w-64 bg-white shadow-md'>
            <div className='p-4'>
                <h2 className='text-xl font-bold mb-4'>My Account</h2>
                <nav className="bg-white shadow-md p-4 rounded-lg w-full max-w-xs">
            <ul className="space-y-4">
              {/* Profile */}
              <li>
                <button
                  className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
                  onClick={() => setActiveTab("Profile")}
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-lg mr-3"
                  />
                  <span className="font-medium">Profile</span>
                </button>
              </li>

              {/* Skills */}
              <li>
                <button
                  className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
                  onClick={() => setActiveTab("Skills")}
                >
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="text-lg mr-3"
                  />
                  <span className="font-medium">Skills</span>
                </button>
              </li>

              {/* Forgot Password */}
              <li>
              <button
  className="flex items-center w-full text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
  onClick={() => setActiveTab("accountSettings")}
>
  <FontAwesomeIcon icon={faLock} className="text-lg mr-3" />
  <span className="font-medium">Account Settings</span>
</button>
              </li>

              {/* Logout */}
              <li>
                <button
                  className="flex items-center w-full text-red-500 p-3 rounded-lg hover:bg-red-50 transition duration-300 ease-in-out"
                  onClick={logoutHandler}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-lg mr-3"
                  />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </nav>

            </div>

        </aside>

        <main className='flex-1 p-8'>
            {activeTab === 'Profile' && (
            <div>
                <h2 className='text-2xl font-bold'> My Profile</h2>
                <p className='text-gray-600 mb-4'>Manage your personal information</p>
                <div>
                    <label className='block text-sm font-medium'>Full Name</label>
                    <input id="name" type='name' defaultValue={userInfo.name} className='w-full p-2 border' ></input>
                </div>
                <div>
                    <label className='block text-sm font-medium'>Email</label>
                    <input id="email" type='email' defaultValue={userInfo.email} className='w-full p-2 border' ></input>
                </div><div>
                    <label className='block text-sm font-medium'>Phone</label>
                    <input id="phone" type='phone' defaultValue="John@gmail.com" className='w-full p-2 border' ></input>
                </div>
            </div>
            )}
            {activeTab ==='Skills' && (
                <div>
                    <h2 className='text-2xl font-bold'>Skills Management</h2>
                    <p className="text-gray-600 mb-4">Add or remove your professional skills</p>
                    <div>
                        <div className='flex flex-wrap gap-2 mb-4'>
                            <div className='flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded'>
                                <span>Driver</span>
                                <button className='text-red-500'>x</button>

                            </div>
                            <div className='flex space-x-2'>
                                <input placeholder='Add a new skill'
                                className='p-2 border w-full' />
                                <button className='bg-blue-500 text-white px-4 py-2 rounded' >Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
           {activeTab === "accountSettings" && (
    <div>
    {/* Your Account Settings content goes here */}
    <h2 className="text-2xl font-bold">Account Settings</h2>
    <p className="text-gray-600 mb-4">Manage your account security and settings</p>
    {/* Include options for changing password, security settings, etc. */}
    <div className="mt-8">
    <button
      onClick={() => setChangePasswordSection(!changePasswordSection)}
      className="bg-blue-500 text-white py-2 px-3 rounded-full font-semibold shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
    >
      Change Password
    </button>
  </div>
  {changePasswordSection &&(
    <div className="mt-2">
    <p className="text-gray-600 mb-2">Please enter your current password and your new password below.</p>
  
    {/* Current Password */}
    <form onSubmit={handlleCHangePassword} >
        <p className='text-red-500 text-sm font-normal'>{errorMessage}</p>
    <div className="mb-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
      <input
        type="password"
        value={currentPassword}
        onChange={(e)=>setCurrentPassword(e.target.value)}

        className="w-[30%] px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
        placeholder="Enter your current password"
      />
    </div>
  
    {/* New Password */}
    <div className="mb-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}

        className="w-[30%] px-2 py-1  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
        placeholder="Enter your new password"
      />
    </div>
  
    {/* Confirm New Password */}
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        className="w-[30%] px-2 py-1  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
        placeholder="Confirm your new password"
      />
    </div>
  
    {/* Save Changes Button */}
    <div className="text-">
      <button  type='submit' className="bg-blue-500 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
        Save Changes
      </button>
    </div>
    </form>
  </div>
  ) }
  


  </div>
)}
            

        </main>
      
    </div>
  )
}

export default ProfileBody
