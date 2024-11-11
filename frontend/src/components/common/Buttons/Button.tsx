// src/components/Button.jsx

import React from 'react';
import { MdLogin, MdPersonAdd } from 'react-icons/md';

export function Button({ children, className = '',disabled = false, ...props }) {
  return (
    <button
      className={`bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 shadow-md transition-all duration-300 transform hover:scale-105 ${className}`}
      disabled={disabled}
      {...props}  
    >

      {children}
    </button>
  );
}

export function SignUpLoginButton({
    isLoading,
    isLoginPage,
    
    className ='',
    ...props
}){
    return (
        <button
        type='submit'
        className={`bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-6 text-sm transition-transform duration-200 transform hover:scale-105 shadow-lg ${className}`}
        {...props}
        > {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : isLoginPage ? (
            <>
              <MdLogin className="inline-block mr-1" />
              Login
            </>
          ) : (
            <>
              <MdPersonAdd className="inline-block mr-1" />
              Sign Up
            </>
          )}

        </button>
    )
}
