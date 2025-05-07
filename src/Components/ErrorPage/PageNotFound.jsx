import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";
import PageTitle from "../PageTitle";

const PageNotFound = () => {
  return (
    <>
      <PageTitle title="404 - Page Not Found" />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="bg-yellow-100 p-3 rounded-full mb-6">
              <FaExclamationTriangle className="text-yellow-500 text-4xl" />
            </div>
            
            <h1 className="text-7xl font-extrabold text-gray-900 mb-2">404</h1>
            <div className="h-1 w-16 bg-yellow-500 rounded-full mb-4"></div>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Oops! The page you're looking for seems to have vanished.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link 
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all transform hover:scale-105 flex-1 text-center"
              >
                <FaHome /> Home
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 px-6 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all transform hover:scale-105 flex-1"
              >
                <FaArrowLeft /> Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
