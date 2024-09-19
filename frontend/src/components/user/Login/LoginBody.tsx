import React from 'react';

function LoginBody() {
  return (
    <div className="relative h-screen">
      
      {/* Background color divisions */}
      <div className="absolute inset-0 w-1/3 bg-blue-500 h-full"></div>
      <div className="absolute inset-0 w-2/3 bg-white h-full ml-[33%] mt-4"></div>
      
      {/* Centered Login Modal */}
      <div className="relative z-10 flex justify-center items-center h-full">
        {/* Modal container with transparency and shadow */}
        <div className="bg-white bg-opacity-70 -lg shadow-2xl w-full max-w-[80%] p-8 relative h-[80%]">
          {/* Close button (optional, can be added if needed) */}
          
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <form className="space-y-6 w-[60%] ">
            {/* Username field */}
            <div>
              <label className="block text-gray-700 text-lg">Username</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Password field */}
            <div>
              <label className="block text-gray-700 text-lg">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-3" />
              <label htmlFor="remember" className="text-gray-600 text-lg">Remember Me</label>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md text-lg"
            >
              Login
            </button>
          </form>

          {/* Forgot password */}
          <div className="mt-6 text-blue-500 text-center">
            <a href="#" className="hover:underline text-lg">Forgot Password?</a>
          </div>

          {/* Sign-up link */}
          <div className="mt-6 text-blue-500 text-center">
            <a href="#" className="hover:underline text-lg">Sign up Here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBody;
