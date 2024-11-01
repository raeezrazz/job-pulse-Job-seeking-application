import React, { useState } from "react";
import "./LoginBody.css"; // Ensure your CSS file has the necessary styles
import { MdEmail ,MdAccountCircle , MdLogin, MdPersonAdd } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { validateEmail,validateName ,validatePassword } from "../../../utils/validations/validation";
import { login } from "../../../api/userApi";


function LoginBody() {
  const [isSwapped, setIsSwapped] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>(""); // For signup

  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
  
    if (isSwapped) {
      if (password.trim() === '') {
        setErrorMessage("Enter a valid Password");
        
        // Reset shake animation
        setShake(false);
        setTimeout(() => setShake(true), 1); // Add a slight delay to trigger shake again
      }else if(!validateEmail(email)){
        setErrorMessage("Please Enter a Valid Email")
       
        setShake(false);
        setTimeout(() => setShake(true), 1); 
      }else{
        setErrorMessage('');
        const data = {
          email,
          password,
        };
        console.log("Sending login request to backend...");
        try{
        const response = await login(data);
        console.log("here the resspaiadskfsadadsgalsjdgngaljs")
        console.log("Login response:", response);

        }catch(error){
          console.log("error happeninig",error)
        }
       
      }


    } else {
      console.log("Signing up with:", { username, email, password });
    }
  };

  const toggleSwap = () => {
    setIsSwapped((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Left Side: Background Section */}
    <div
  className={`w-full sm:w-3/6 flex items-center justify-start bg-gray-500 text-white p-6 sm:p-8 shadow-lg transition-transform duration-500 ${isSwapped ? 'translate-x-full' : ''}`}
   // Click to swap
>
  <div className="flex flex-col items-start w-full sm:w-2/3">
    {/* Conditional Rendering Based on isSignIn State */}
    {isSwapped ? (
      <>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">Welcome Back to JobPulse</h2>
        <p className="text-base sm:text-lg mb-6 text-gray-300">Log in to continue your job search or manage your applications!</p>
        <button
          onClick={toggleSwap} // Switch to Sign Up
          className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Sign Up
        </button>
      </>
    ) : (
      <>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">Join JobPulse Today</h2>
        <p className="text-base sm:text-lg mb-6 text-gray-300">Create an account to find your perfect job or candidate!</p>
        <button
          onClick={toggleSwap} // Switch to Sign In
          className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Sign In
        </button>
      </>
    )}
  </div>
</div>


  
    {/* Right Side: Login Form */}
    <div
  className={`w-full lg:w-3/6 flex items-center justify-center lg:p-24 p-6 bg-white shadow-md rounded-lg transition-transform duration-500 ${isSwapped ? '-translate-x-full' : ''}`}
 // Click to swap
>
  <div className="w-full max-w-xs">
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">{isSwapped ? "JobPulse " : "JobPulse "}</h1>
    </div>
    {shake  && <p className={`text-red-500 text-xs ${errorMessage && 'animate-shake'}`}>
  {errorMessage}
</p>}
    


    <form onSubmit={handleSubmit}>
      {/* Conditional Rendering of Fields */}
      {!isSwapped && ( // Show username field only for signup
        <div className="flex items-center border-b border-gray-300 py-1.5 mb-3">
          <MdAccountCircle className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required // Added required attribute
          />
        </div>
      )}

      {/* Email Input */}
      <div className="flex items-center border-b border-gray-300 py-1.5 mb-3">
        <MdEmail className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
          required // Added required attribute
        />
      </div>

      {/* Password Input */}
      <div className="flex items-center border-b border-gray-300 py-1.5 mb-3">
        <IoIosLock className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required // Added required attribute
        />
      </div>

      {/* Bottom Section */}
      <div className={`flex justify-between items-center mb-4`}>
        {/* Display Forgot Password only when in Login Mode */}
        {isSwapped && (
          <a
            href="#"
            className="text-xs font-semibold text-blue-700 hover:underline"
           
          >
            Forgot Password?
          </a>
        )}
      </div> 
          <div className="text-center">
      <button
        type="submit"
        className={`bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 text-sm  transition-transform duration-200 transform hover:scale-105 shadow-lg ${isSwapped && 'mt-1'}`}
      >
        {isSwapped ? (
          <>
            <MdLogin className="inline-block mr-1" /> {/* Add an icon for login */}
            Login
          </>
        ) : (
          <>
            <MdPersonAdd className="inline-block mr-1" /> {/* Add an icon for sign up */}
            Sign Up
          </>
        )}
      </button>
      </div>
    </form>

    {/* Google Button Section */}
    <div className="flex items-center justify-center mt-4">
  <button className="flex items-center bg-transparent border border-gray-100 hover:bg-red-500 text-gray-800 font-semibold rounded-full py-2 px-4 text-sm transition-transform duration-200 shadow-lg">
    <FcGoogle className="w-5 h-5 mr-2" /> {/* Google icon */}
    Continue with Google
  </button>
</div>

  </div>
</div>


  </div>
  

    
     
    
  );
}

export default LoginBody;
