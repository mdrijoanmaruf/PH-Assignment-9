import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { errorToast } from '../utils/toastConfig';

const PrivateRoute = ({ children }) => {
  const { user, loading, authChecked } = useContext(AuthContext);
  const location = useLocation();
  
  useEffect(() => {
    // Only proceed if auth check is complete and we know user is not logged in
    if (authChecked && !loading && !user) {
      // Generate a consistent toast ID for this path
      const toastId = 'auth_redirect_toast';
      
      // Dismiss any existing toasts with this ID to prevent duplicates
      toast.dismiss(toastId);
      
      // Show a custom toast notification when redirecting
      toast.error(
        <div className="text-center">
          <h4 className="text-lg font-bold mb-1">Access Denied</h4>
          <p>Please log in to view this content</p>
        </div>,
        {
          ...errorToast,
          id: toastId,
        }
      );
    }
  }, [user, loading, authChecked]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute; 