  import React, { useState, useEffect } from "react";
  import { useDispatch } from "react-redux";
  import "./LoginBody.css";
  import { signUp, verifyOtp } from "../../../api/userApi";
  import { resentOtp } from "../../../api/userApi";

  import apiClient from "../../../api/apiClient/axios";
  import { setCredentials } from "../../../store/slice/userSlice";

  const LoginBody = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [count, setCount] = useState<number>(30);

    const [loginPage, setLoginPage] = useState<boolean>(true);
    const [otpPage, setOtpPage] = useState<boolean>(false);

    const [emailError, setEmailError] = useState<String>("");
    const [passwordError, setPasswordError] = useState<String>("");
    const [nameError, setNameError] = useState<String>("");
    const [otpError, setOtpError] = useState<String>("");

    const dispatch = useDispatch();

    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };

    const validateName = (name: string): boolean => {
      const nameRegex = /^[a-zA-Z\s]+$/;
      return name.trim().length >= 3 && nameRegex.test(name);
    };

    const handleOtpVerification = async (e)=>{
      e.preventDefault()
      console.log("here is the verify otp")
      const response = await verifyOtp(otp.join(''),email)
      console.log(response,"kkklllllllllllllllllllllllllllll",response.data.message)

      console.log("completed 444444444444444444444444444444444444444444444444444444")
      setOtpPage(false
        )
    }



    const handleChange = (e, index) => {
      const newOtp = [...otp]; // Create a copy of the OTP array
      newOtp[index] = e.target.value; // Update the specific index with the new value
      setOtp(newOtp);
  
      // Focus on the next input if the current input has a value
      if (e.target.value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setEmailError("");
      setPasswordError("");
      setNameError("");

      if (!loginPage) {
        if (email.trim() === "") {
          setEmailError("Please enter a valid Email");
          return;
        }
        if (password.trim() === "") {
          setPasswordError("Please enter your password");
          return;
        }
      } else {
        let errors = false;
        if (!validateName(name)) {
          setNameError(
            "Name must contain at least 3 characters and only letters."
          );
          return;
        }

        if (!validateEmail(email)) {
          setEmailError("Please enter a valid email address.");
          errors = true;
        }
        if (password !== confirmPassword) {
          setPasswordError(
            "Passwords do not match. Please ensure both passwords are identical."
          );
          errors = true;
        } else if (!validatePassword(password)) {
          setPasswordError(
            "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
          );
          errors = true;
        }
        if (!errors) {
          try {
            console.log(
              "Sending registration/login request...",
              name,
              password,
              email
            );
            const data = {
              name: !loginPage ? undefined : name,
              email,
              password,
            };
            const response = await signUp(data);
            if (response.data.success) {
              dispatch(setCredentials(response.data.data));
              setOtpPage(true);
              setCount(30)
            } else if (response.data.already) {
              setEmailError("This Email already exist, please login");
            } else {
              console.error(response.data.message || "Registration failed.");
            }
          } catch (error) {
            console.error("Error registering/logging in:", error);
          }
        }
      }
    };

    const resendOtp = async() => {
      setCount(30);
      const response = await resentOtp(email)

      console.log(response,"----------------------")
      
    };

    useEffect(() => {
      setEmailError("");
      setNameError("");
      setPasswordError("");
      if (count > 0 ) {
        const timer = setInterval(() => {
          setCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(timer);
      } 
    }, [count]);

    return (
      <div className="bg-white flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="./wallpaperflare.com_wallpaper.jpg"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Login Form */}
        {!otpPage ? (
          <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            {loginPage ? (
              <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
            ) : (
              <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
            )}

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
              ) : (
                <></>
              )}
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
              {!loginPage ? (
                <div className="mb-6 text-blue-500">
                  <a href="#" className="hover:underline">
                    Forgot Password?
                  </a>
                </div>
              ) : (
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-800">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
              >
                {loginPage ? <p>Register</p> : <p>Login</p>}
              </button>
            </form>

            {/* Sign up Link */}
            {loginPage ? (
              <div className="mt-6 text-black-500 text-center">
                Already have an account?{" "}
                <button
                  onClick={() => setLoginPage(false)}
                  className="hover:underline text-blue-500"
                >
                  Sign In Here
                </button>
              </div>
            ) : (
              <div className="mt-6 text-black-500 text-center">
                Dont have an account?{" "}
                <button
                  onClick={() => setLoginPage(true)}
                  className="hover:underline text-blue-500"
                >
                  Sign Up Here
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <h1 className="text-2xl font-semibold mb-4">Verify Otp</h1>

            <form onSubmit={handleOtpVerification}>
              <p className="text-red-500"> {emailError} </p>

              {/* Password Input */}
              <p className="text-red-500"> {passwordError} </p>

              <p className="text-red-500 text-sm md:text-base mb-4  font-semibold">
                An OTP has been sent to your email. Please enter the OTP below to
                verify your account:
              </p>
              <div className="flex justify-center space-x-8 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="number" // Keep the type as number
                    id={`otp-${index}`}
                    name={`otp-${index}`}
                    maxLength="1" // Limit to one character
                    className="w-12 h-12 border border-gray-400 rounded-md text-center focus:outline-none focus:border-blue-500 no-arrows" // Add a custom class
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    autoComplete="off"
                  />
                ))}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                // disabled={otp.every(digit => digit === "")}
              >
                <p>Verify Otp</p>
              </button>
            </form>

            {/* Sign up Link */}

            <div className="mt-6 text-black-500 text-center">
              <p>If you did not receive the OTP,</p>

              <button
                onClick={resendOtp}
                disabled={count > 0}
                className={`hover:underline text-blue-500 ${
                  count > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Resend OTP
              </button>
              <a className="btn"> in : {count} sec</a>
            </div>
            <div className="mt-5 text-center">
            <p className={''}>Back to <a onClick={()=>setOtpPage(false)} href="" className={"text-blue-500 hover:underline"}>Sign Up</a> </p> 

            </div>
          </div>
        )}
      </div>
    );
  };

  export default LoginBody;
