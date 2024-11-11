  import React, { useEffect, useState ,useRef } from "react";
  import "./LoginBody.css";
  import { MdEmail, MdAccountCircle, MdLogin, MdPersonAdd } from "react-icons/md";
  import { FcGoogle } from "react-icons/fc";
  import { IoIosLock, IoIosMail } from "react-icons/io";
  import { Button, SignUpLoginButton } from "../../common/Buttons/Button";
  import {
    validateEmail,
    validateName,
    validatePassword,
  } from "../../../utils/validations/validation";
  import useIsMediumScreen from "../../hooks/UseIsMediumScreen";
  import { login, signUp, dummy } from "../../../api/userApi";
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
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });
  const otpSchema = Yup.object().shape({
    otp: Yup.string().length(4, "Enter the four digit Otp sent to your Email"),
  });

  function LoginBody() {
    const otpRefs = useRef([...Array(4)].map(() => React.createRef()));


    const [isLoginPage, setisLoginPage] = useState(false);
    const [isOtpPage, setOtpPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [shake, setShake] = useState(false);
    const [otpValues, setOtpValues] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);

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
          console.log("here inside this login is working", values);
          const data = {
            email: values.email,
            password: values.password,
          };
          await login(data);
        } else {
          console.log("here inside this signUp is working", values);

          const response = await signUp(values);
          console.log("here is the respond of signUp", response);

          if (response.data.success) {
            setOtpPage(true);
          }
        }
      } catch (error) {
        console.log(error, "here is the errors from signup");
        setErrorMessage(error.response.data.message);
        setShake(true);
        setTimeout(() => setShake(false), 500); // Reset shake effect after a brief delay
      } finally {
        setIsLoading(false);
      }
    };
    const handleOtpChange = (e, index) => {
      const { value } = e.target;
    
      if (!/^\d$/.test(value) && value !== "") return;
    
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
    
      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].current.focus();
      } 
      else if (!value && index > 0) {
        otpRefs.current[index - 1].current.focus();
      }
    };
    
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && otpValues[index] === "" && index > 0) {
        otpRefs.current[index - 1].current.focus();
      }
    };
    
  
    const handleOtpSubmit = (e: any) => {
      e.preventDefault();
    };

    const handleResendOtp = (e: any) => {
      e.preventDefault();
      setTimer(30);
    };
    useEffect(() => {
      let interval: any;
      if (timer > 0) {
        interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      }
      return () => clearInterval(interval);
    }, [timer]);

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
            animate={
              isLoginPage
                ? { x: isMediumScreen ? [-800, 150, 100] : [-800, 150, 100] }
                : { x: isMediumScreen ? [800, 50, 100] : [800, -20, 20] }
            }
            transition={{ ease: "easeOut", duration: 2 }}
            className="flex flex-col items-start w-full md:w-2/3"
          >
            {isLoginPage ? (
              <>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">
                  Welcome Back to JobPulse
                </h2>
                <p className="text-sm sm:text-base mb-6 text-gray-300">
                  Log in to continue your job search or manage your applications!
                </p>
                <Button onClick={toggleSwap}>Sign Up</Button>
              </>
            ) : (
              <>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">
                  Join JobPulse Today
                </h2>
                <p className="text-sm sm:text-base mb-6 text-gray-300">
                  Create an account to find your perfect job or candidate!
                </p>
                <Button onClick={toggleSwap} disabled={isOtpPage}>
                  Sign In
                </Button>
              </>
            )}
          </motion.div>
        </div>

        {/* Right Side: Login Form */}
        <div
          className={`w-full md:w-3/6 flex items-center  justify-center lg:p-24 p-6 bg-white shadow-md rounded-lg transition-transform duration-500 ${
            isLoginPage ? "-translate-x-full" : ""
          }`}
        >
          {isOtpPage ? (
            <>
               <div className="w-full max-w-xs">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">JobPulse</h1>
      </div>
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={otpSchema}
        onSubmit={handleOtpSubmit}
      >
        <Form>
          <div className="flex items-center justify-center mb-4">
            <IoIosMail className="text-blue-500 w-12 h-12 mr-2" />
            <h6 className="text-sm font-semibold text-gray-700">
              An OTP has been sent to your email address
            </h6>
          </div>

          <ErrorMessage
            name="otp"
            component="div"
            className="text-red-500 text-xs"
          />

          <div className="flex justify-between mt-2 mb-4">
            {[0, 1, 2, 3].map((_, index) => (
              <input
                ref={otpRefs.current[index]} // Assign ref to each input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={otpValues[index]}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-10 text-center text-lg border-b border-gray-300 bg-transparent focus:outline-none text-gray-700"
              />
            ))}
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="w-80 mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Verify OTP
            </Button>
          </div>
          <div className="text-center mt-4">
            {timer > 0 ? (
              <div className="w-full text-center text-gray-500 font-semibold py-2">
                Resend OTP in {timer} seconds
              </div>
            ) : (
              <a
                onClick={handleResendOtp}
                className="w-full text-gray-500 font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              >
                Resend OTP
              </a>
            )}
          </div>
        </Form>
      </Formik>
    </div>

            </>
          ) : (
            <motion.div
              key={isLoginPage}
              animate={{ fontSize: "50px" }}
              transition={{ duration: 1 }}
              className="w-full max-w-xs "
            >
              <div className="text-center mb-6">
                <motion.h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  JobPulse
                </motion.h1>
              </div>
              {errorMessage && (
                <p className={`text-red-500 text-xs ${shake && "animate-shake"}`}>
                  {errorMessage}
                </p>
              )}
              <Formik
                initialValues={{ email: "", password: "", username: "" }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    {!isLoginPage && (
                      <>
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-xs"
                        />

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
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs"
                    />

                    <div className="flex items-center border-b border-gray-300 py-1.5 mb-3">
                      <MdEmail className="text-gray-500 w-5 h-5 mr-2" />
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs"
                    />

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
                      <SignUpLoginButton
                        type="submit"
                        isLoading={isLoading}
                        isLoginPage={isLoginPage}
                        disabled={isLoading}
                        onClick={handleSubmit}
                      >
                      </SignUpLoginButton>
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
          )}
        </div>
      </div>
    );
  }

  export default LoginBody;
