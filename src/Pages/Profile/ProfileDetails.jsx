import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaBirthdayCake, FaMale, FaFemale, FaGlobeAmericas, FaUser, FaPen, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { successToast, errorToast } from '../../utils/toastConfig';

const ProfileDetails = ({ user }) => {
  // User details state
  const [userDetails, setUserDetails] = useState({
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    dateOfBirth: '',
    gender: ''
  });
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  // Load user details from localStorage if available
  useEffect(() => {
    if (user) {
      const savedDetails = localStorage.getItem(`userDetails_${user.uid}`);
      if (savedDetails) {
        setUserDetails(JSON.parse(savedDetails));
      }
    }
  }, [user]);

  const handleEditDetails = () => {
    setIsEditingDetails(true);
  };

  const handleCancelEditDetails = () => {
    setIsEditingDetails(false);
    // Reset to stored values
    const savedDetails = localStorage.getItem(`userDetails_${user.uid}`);
    if (savedDetails) {
      setUserDetails(JSON.parse(savedDetails));
    }
  };

  const handleDetailsFormChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Save user details to localStorage
      localStorage.setItem(`userDetails_${user.uid}`, JSON.stringify(userDetails));
      
      toast.success('Profile details updated successfully!', successToast);
      setIsEditingDetails(false);
    } catch (error) {
      console.error('Error updating profile details:', error);
      toast.error('Failed to update profile details. Please try again.', errorToast);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Additional Information</h3>
        {!isEditingDetails ? (
          <button 
            onClick={handleEditDetails}
            className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            <FaPen className="mr-1" /> Update Details
          </button>
        ) : (
          <button 
            onClick={handleCancelEditDetails}
            className="flex items-center text-red-600 font-medium hover:text-red-800 transition-colors"
          >
            <FaTimes className="mr-1" /> Cancel
          </button>
        )}
      </div>
      
      {!isEditingDetails ? (
        // Display user details
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm mb-1">Phone Number</p>
            <div className="flex items-center">
              <FaPhoneAlt className="text-blue-600 mr-3" />
              <p className="text-gray-800 font-medium">{userDetails.phone || 'Not set'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Gender</p>
            <div className="flex items-center">
              {userDetails.gender === 'Male' ? 
                <FaMale className="text-blue-600 mr-3" /> : 
                userDetails.gender === 'Female' ? 
                  <FaFemale className="text-blue-600 mr-3" /> :
                  <FaUser className="text-blue-600 mr-3" />
              }
              <p className="text-gray-800 font-medium">{userDetails.gender || 'Not set'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Date of Birth</p>
            <div className="flex items-center">
              <FaBirthdayCake className="text-blue-600 mr-3" />
              <p className="text-gray-800 font-medium">{userDetails.dateOfBirth || 'Not set'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Country</p>
            <div className="flex items-center">
              <FaGlobeAmericas className="text-blue-600 mr-3" />
              <p className="text-gray-800 font-medium">{userDetails.country || 'Not set'}</p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm mb-1">Address</p>
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-blue-600 mr-3 mt-1" />
              <div>
                <p className="text-gray-800 font-medium">{userDetails.address || 'Not set'}</p>
                {(userDetails.city || userDetails.zipCode) && (
                  <p className="text-gray-600">
                    {userDetails.city}
                    {userDetails.city && userDetails.zipCode && ', '}
                    {userDetails.zipCode}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Edit user details form
        <form onSubmit={handleDetailsSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleDetailsFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 (123) 456-7890"
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={userDetails.gender}
                onChange={handleDetailsFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={userDetails.dateOfBirth}
                onChange={handleDetailsFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={userDetails.country}
                onChange={handleDetailsFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Country"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={userDetails.address}
                onChange={handleDetailsFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Street address"
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={userDetails.city}
                onChange={handleDetailsFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="City"
              />
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={userDetails.zipCode}
                onChange={handleDetailsFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Postal code"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Save Details
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileDetails; 