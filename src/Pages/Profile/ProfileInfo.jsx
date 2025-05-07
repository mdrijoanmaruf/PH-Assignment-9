import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaEnvelope, FaPen, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { successToast, errorToast } from '../../utils/toastConfig';

const ProfileInfo = ({ user }) => {
  const { logOut, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    photoURL: ''
  });

  // Initialize edit form with current user data
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.displayName || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user]);

  const handleLogout = () => {
    toast.loading('Logging out...', { id: 'profile-logout' });
    
    logOut()
      .then(() => {
        toast.dismiss('profile-logout');
      })
      .catch(error => {
        toast.dismiss('profile-logout');
        console.error(error);
      });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form to current user data
    setEditForm({
      name: user.displayName || '',
      photoURL: user.photoURL || ''
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    updateUserProfile(editForm.name, editForm.photoURL)
      .then(() => {
        toast.success('Profile updated successfully!', successToast);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile. Please try again.', errorToast);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
              <img 
                src={user.photoURL || "https://via.placeholder.com/150"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{user.displayName || 'User'}</h3>
            <p className="text-gray-600 mb-4">{user.email}</p>
            {!isEditing ? (
              <button 
                onClick={handleEditProfile}
                className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                <FaPen className="mr-1" /> Edit Profile
              </button>
            ) : (
              <button 
                onClick={handleCancelEdit}
                className="flex items-center text-red-600 font-medium hover:text-red-800 transition-colors"
              >
                <FaTimes className="mr-1" /> Cancel
              </button>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          {!isEditing ? (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Account Information</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Full Name</p>
                  <div className="flex items-center">
                    <FaUser className="text-blue-600 mr-3" />
                    <p className="text-gray-800 font-medium">{user.displayName || 'Not set'}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email Address</p>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-600 mr-3" />
                    <p className="text-gray-800 font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm mb-1">Account Status</p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                    <p className="text-gray-800 font-medium">Active</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-red-600 font-medium hover:text-red-800 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" /> Log Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Profile</h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  value={editForm.photoURL}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/your-photo.jpg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter a URL for your profile photo. Leave empty to use default avatar.
                </p>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo; 