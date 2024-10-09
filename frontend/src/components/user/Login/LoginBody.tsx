import React, { useState ,useEffect } from "react";
import axios from "axios";
import Login from "../../../Pages/Login";
import { signUp } from "../../../api/userApi";
import apiClient from "../../../api/apiClient/axios";

const LoginBody = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [loginPage , setLoginPage] = useState<boolean>(true)
  const [emailError , setEmailError] = useState<String>('')
  const [passwordError , setPasswordError] = useState<String>('')
  const [nameError , setNameError] = useState<String>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Clear previous error messages
    setEmailError("");
    setPasswordError("");
    setNameError("");

    // Validate email, password, and name fields
    if (!loginPage) {
      if (email.trim() === "") {
        setEmailError("Please enter a valid Email");
        return; // Stop execution if there's an error
      }
      if (password.trim() === "") {
        setPasswordError("Please enter your password");
        return; // Stop execution if there's an error
      }
    } else {
      if (name.trim() === "") {
        setNameError("Please enter a valid name");
        return; // Stop execution if there's an error
      }
      if (email.trim() === "") {
        setEmailError("Please enter a valid Email");
        return; // Stop execution if there's an error
      }
      if (password.trim() === "") {
        setPasswordError("Please enter your password");
        return; // Stop execution if there's an error
      }
    }

    try {
      console.log("Sending registration/login request...");
      const response = await apiClient('/user/register', {
        data:{
          name:!loginPage ? undefined : name, // Send name only if not on login page
          email,
          password,
        },
      });
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error('Error registering/logging in:');
    }
  };
  
  useEffect(() => {
    setEmailError('');
    setNameError('');
    setPasswordError('');
  }, []);
  
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src='./wallpaperflare.com_wallpaper.jpg'
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        {loginPage ? <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>:<h1 className="text-2xl font-semibold mb-4">Sign In</h1>}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          {loginPage ? (
            <>
            <p className="text-red-500"> {nameError} </p>
           <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
           
          </div>
          </>
          )
            :(<></>  )
              }
              <p className="text-red-500"> {emailError} </p>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <p className="text-red-500"> {passwordError} </p>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>

          
          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {loginPage ? <p>Register</p>: <p>Login</p> }
            
          </button>
        </form>

        {/* Sign up Link */}
        { loginPage ?
        <div className="mt-6 text-black-500 text-center">
            Already have an account?{" "}
              <button onClick={()=>setLoginPage(false)} className="hover:underline text-blue-500">
                  Sign In Here 
            </button>
        </div> :<div className="mt-6 text-black-500 text-center">
            Dont have an account?{" "}
              <button onClick={()=>setLoginPage(true)} className="hover:underline text-blue-500">
                  Sign Up Here 
            </button>
        </div>
        }
      </div>
    </div>
  );
};

export default LoginBody;
