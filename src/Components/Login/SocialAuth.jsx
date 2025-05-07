import React, { useContext } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { successToast, errorToast } from '../../utils/toastConfig';

const SocialAuth = ({ darkMode = true }) => {
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        toast.success('Successfully signed in with Google!', successToast);
        navigate(from, { replace: true });
      })
      .catch(error => {
        toast.error('Sign in failed. Please try again.', errorToast);
        console.error(error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithGithub()
      .then(result => {
        toast.success('Successfully signed in with GitHub!', successToast);
        navigate(from, { replace: true });
      })
      .catch(error => {
        toast.error('Sign in failed. Please try again.', errorToast);
        console.error(error);
      });
  };

  return (
    <div className="my-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${darkMode ? 'border-blue-300 opacity-30' : 'border-gray-300'}`}></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`px-2 ${darkMode ? 'bg-blue-600 text-blue-100' : 'bg-white text-gray-500'}`}>
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
        >
          <FcGoogle className="mr-2 text-xl" /> Google
        </button>
        <button
          type="button"
          onClick={handleGithubSignIn}
          className="flex justify-center items-center px-3 py-2 border border-gray-800 rounded-lg shadow-sm bg-gray-900 text-sm font-medium text-white hover:bg-black transition cursor-pointer"
        >
          <FaGithub className="mr-2" /> GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialAuth; 