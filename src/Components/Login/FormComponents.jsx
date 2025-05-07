import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Reusable input field with icon
export const InputField = ({ icon, label, name, type, value, onChange, placeholder, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          required={required}
          value={value}
          onChange={onChange}
          className={`block w-full pl-10 ${isPassword ? 'pr-10' : 'pr-3'} py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          placeholder={placeholder}
        />
        {isPassword && (
          <div 
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
            ) : (
              <FaEye className="text-gray-400 hover:text-gray-600" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Primary button component
export const PrimaryButton = ({ type = "button", onClick, children }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
  >
    {children}
  </button>
);

// Social login section
export const SocialLogin = () => (
  <div className="mt-6">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">Or continue with</span>
      </div>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-3">
      <button
        type="button"
        className="flex justify-center items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Google
      </button>
      <button
        type="button"
        className="flex justify-center items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Facebook
      </button>
    </div>
  </div>
);

// Form container
export const FormContainer = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
    <div className="bg-white rounded-xl shadow-lg p-5 max-w-md w-full">
      {children}
    </div>
  </div>
);

// Account toggle link (sign in/sign up)
export const AccountToggle = ({ hasAccount = true, dark = false }) => (
  <div className="mt-4 text-center">
    <p className={`text-sm ${dark ? 'text-blue-100' : 'text-gray-600'}`}>
      {hasAccount ? "Don't have an account? " : "Already have an account? "}
      <Link
        to={hasAccount ? "/signup" : "/login"}
        className={`font-medium underline ${dark ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-500'} transition`}
      >
        {hasAccount ? "Sign up" : "Sign in"}
      </Link>
    </p>
  </div>
); 