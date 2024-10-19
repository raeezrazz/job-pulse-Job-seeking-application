import React,{useState} from 'react';
import { adminLogin } from '../../../api/adminApi';

function AdminLoginPage() {

  const [email,setEmail] = useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [emailError, setEmailError] =useState<string>('')
  const [passwordError, setPasswordError]= useState<string>('')


  interface FormErrors {
    email: string;
    password: string;
  }


  const validateEmail = (email:string)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^\S+$/;
    return passwordRegex.test(password);
  };


  const handleSubmit = async (e:any): Promise<void> => {
    let isFormValid: boolean = true;
    e.preventDefault()
  
  
    setEmailError('');
    setPasswordError('');
  
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isFormValid = false;
    }
  
    // if (!validatePassword(password)) {
    //   setPasswordError('Password cannot be empty.');
    //   isFormValid = false;
    // }
  
    if (isFormValid) {
      try {
        console.log("dfd")
        console.log('Form is valid. Submitting...');
        const response = adminLogin({email,password})
        console.log(response)


      } catch (error: unknown) {
        console.log(error,"error while submiting")
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="bg-gray-600rounded-lg p-6 lg:w-1/3 w-full mx-4">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Admin Login
          <p>{emailError,passwordError}</p>
        </h2>
        <form  onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border bg-gray-800 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              autoComplete="off"
            />
          </div>
          <div className="text-right mb-3">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
