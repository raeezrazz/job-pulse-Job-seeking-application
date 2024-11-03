import React, { useState } from "react";
import "./LoginBody.css"; // Ensure your CSS file has the necessary styles
import { MdEmail, MdAccountCircle, MdLogin, MdPersonAdd } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { validateEmail } from "../../../utils/validations/validation";
import useIsMediumScreen from "../../hooks/UseIsMediumScreen";

import { login } from "../../../api/userApi";
import { motion } from "framer-motion";

function LoginBody() {
  const [isSwapped, setIsSwapped] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>(""); // For signup
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);



  const isMediumScreen = useIsMediumScreen(); // Check if screen size is medium or larger

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (isSwapped) {
      if (password.trim() === '') {
        setErrorMessage("Enter a valid Password");
        setShake(false);
        setTimeout(() => setShake(true), 1);
      } else if (!validateEmail(email)) {
        setErrorMessage("Please Enter a Valid Email");
        setShake(false);
        setTimeout(() => setShake(true), 1);
      } else {
        setErrorMessage('');
        const data = {
          email,
          password,
        };
        try {
          const response = await login(data);
          console.log("Login response:", response);
        } catch (error) {
          console.log("Error:", error);
        }
      }
    } else {
      console.log("Signing up with:", { username, email, password });
    }
    setIsLoading(false);
  };

  const toggleSwap = () => {
    if (window.innerWidth >= 640) { // Only allow swap on larger screens
      setIsSwapped((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
    {/* Left Side: Background Section */}
    <div
      className={`flex items-center justify-start bg-gray-800 text-white p-6 md:p-8 shadow-lg transition-transform duration-500 ${
        isSwapped ? "translate-x-full" : ""
      } ${isSwapped ? "flex-grow-1" : "flex-grow-0"} md:flex-grow`}
    ><motion.div
      key={isSwapped}
      animate={
        isSwapped
          ? { x: isMediumScreen ? [-800, 150, 100] : [-800, 150, 100] }
          : { x: isMediumScreen ? [800, 50, 100] : [800, -20, 20] }
      }
      transition={{ ease: "easeOut", duration: 2 }}
      className="flex flex-col items-start w-full md:w-2/3"
    >
          {isSwapped ? (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">Welcome Back to JobPulse</h2>
              <p className="text-sm sm:text-base mb-6 text-gray-300">Log in to continue your job search or manage your applications!</p>
              {/* Sign Up Button on the left side */}
              <button onClick={toggleSwap} className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 shadow-md transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">Join JobPulse Today</h2>
              <p className="text-sm sm:text-base mb-6 text-gray-300">Create an account to find your perfect job or candidate!</p>
              {/* Sign In Button on the left side */}
              <button onClick={toggleSwap} className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 shadow-md transition-all duration-300 transform hover:scale-105">
                Sign In
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className={`w-full md:w-3/6  flex items-center justify-center lg:p-24 p-6 bg-white shadow-md rounded-lg transition-transform duration-500 ${isSwapped ? '-translate-x-full' : ''}`}>
        <motion.div key={isSwapped} animate={{ fontSize: "50px" }} transition={{ duration: 1 }} className="w-full max-w-xs">
          <div className="text-center mb-6">
            <motion.h1 className="text-3xl font-bold tracking-tight text-gray-900">JobPulse</motion.h1>
          </div>
          {shake && <p className={`text-red-500 text-xs ${errorMessage && 'animate-shake'}`}>{errorMessage}</p>}
          
          <form onSubmit={handleSubmit}>
            {/* Conditional Rendering of Fields */}
            {!isSwapped && (
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
                  required
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
                required
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
                required
              />
            </div>

            {/* Bottom Section */}
            <div className={`flex justify-between items-center mb-4`}>
              {isSwapped && (
                <a href="#" className="text-xs font-semibold text-blue-700 hover:underline">
                  Forgot Password?
                </a>
              )}
            </div> 
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 text-sm transition-transform duration-200 transform hover:scale-105 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  isSwapped ? (
                    <>
                      <MdLogin className="inline-block mr-1" />
                      Login
                    </>
                  ) : (
                    <>
                      <MdPersonAdd className="inline-block mr-1" />
                      Sign Up
                    </>
                  )
                )}
              </button>
            </div>
          </form>

          {/* Google Button Section */}
          <div className="flex items-center justify-center mt-4">
            <button className="flex items-center bg-transparent border border-gray-100 hover:bg-red-500 text-gray-800 font-semibold rounded-full py-2 px-4 text-sm transition-transform duration-200 shadow-lg">
              <FcGoogle className="mr-2" />
              {isSwapped ? "Login with Google" : "Sign Up with Google"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginBody;
