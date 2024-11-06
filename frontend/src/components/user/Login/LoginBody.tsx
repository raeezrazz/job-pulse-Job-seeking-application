import React, { useState } from "react";
import "./LoginBody.css";
import { MdEmail, MdAccountCircle, MdLogin, MdPersonAdd } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { validateEmail, validateName, validatePassword } from "../../../utils/validations/validation";
import useIsMediumScreen from "../../hooks/UseIsMediumScreen";
import { login, signUp } from "../../../api/userApi";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
  username?: string;
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
    .required("Password is required"),
});

function LoginBody() {
  const [isLoginPage, setisLoginPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);

  const isMediumScreen = useIsMediumScreen();

  const toggleSwap = () => {
    if (window.innerWidth >= 640) {
      setisLoginPage((prev) => !prev);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (isLoginPage) {
        await login(values.email, values.password);
      } else {
        await signUp(values.username!, values.email, values.password);
      }
    } catch (error) {
      setErrorMessage("Login or signup failed. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset shake effect after a brief delay
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Side: Background Section */}
      <div
        className={`flex items-center justify-start bg-gray-800 text-white p-6 md:p-8 shadow-lg transition-transform duration-500 ${
          isLoginPage ? "translate-x-full" : ""
        } ${isLoginPage ? "flex-grow-1" : "flex-grow-0"} md:flex-grow`}
      >
        <motion.div
          key={isLoginPage}
          animate={isLoginPage ? { x: isMediumScreen ? [-800, 150, 100] : [-800, 150, 100] } : { x: isMediumScreen ? [800, 50, 100] : [800, -20, 20] }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="flex flex-col items-start w-full md:w-2/3"
        >
          {isLoginPage ? (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">Welcome Back to JobPulse</h2>
              <p className="text-sm sm:text-base mb-6 text-gray-300">Log in to continue your job search or manage your applications!</p>
              <button onClick={toggleSwap} className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 shadow-md transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">Join JobPulse Today</h2>
              <p className="text-sm sm:text-base mb-6 text-gray-300">Create an account to find your perfect job or candidate!</p>
              <button onClick={toggleSwap} className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 shadow-md transition-all duration-300 transform hover:scale-105">
                Sign In
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className={`w-full md:w-3/6 flex items-center  justify-center lg:p-24 p-6 bg-white shadow-md rounded-lg transition-transform duration-500 ${isLoginPage ? "-translate-x-full" : ""}`}>
        <motion.div
          key={isLoginPage}
          animate={{ fontSize: "50px" }}
          transition={{ duration: 1 }}
          className="w-full max-w-xs "
        >
          <div className="text-center mb-6">
            <motion.h1 className="text-3xl font-bold tracking-tight text-gray-900">JobPulse</motion.h1>
          </div>
          {errorMessage && <p className={`text-red-500 text-xs ${shake && "animate-shake"}`}>{errorMessage}</p>}
          <Formik
            initialValues={{ email: "", password: "", username: "" }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {!isLoginPage && (
                  <>     
                  <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />

                  <div className="flex items-center border-b border-gray-300 py-1.5 mb-3">
                    <MdAccountCircle className="text-gray-500 w-5 h-5 mr-2" />
                    <Field
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
                    />
                  </div>

                  </>

                )}
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />

                <div className="flex items-center border-b border-gray-300 py-1.5 mb-3">
                  <MdEmail className="text-gray-500 w-5 h-5 mr-2" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                  
                <div className="flex items-center border-b border-gray-300 py-1.5 mb-3">
                  <IoIosLock className="text-gray-500 w-5 h-5 mr-2" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
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
                      isLoginPage ? (
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
              </Form>
            )}
          </Formik>

          <div className="flex items-center justify-center mt-4">
            <button className="flex items-center bg-transparent border border-gray-100 hover:bg-red-100 text-gray-600 rounded-full py-2 px-4 text-sm">
              <FcGoogle className="inline-block mr-1" />
              Sign in with Google
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginBody;
