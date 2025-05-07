import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { successToast } from '../../utils/toastConfig';

const ProfileWishlist = ({ user, wishlist, loading, setWishlist }) => {
  const handleRemoveFromWishlist = (id) => {
    if (!user) return;
    
    const userEmail = user.email;
    const savedWishlist = JSON.parse(localStorage.getItem('userWishlist')) || {};
    const userWishlist = savedWishlist[userEmail] || [];
    
    // Find subscription name
    const subscription = wishlist.find(sub => sub.id === id);
    const subscriptionName = subscription ? subscription.name : 'Item';
    
    // Remove from wishlist
    const updatedWishlist = userWishlist.filter(itemId => itemId !== id);
    savedWishlist[userEmail] = updatedWishlist;
    localStorage.setItem('userWishlist', JSON.stringify(savedWishlist));
    
    // Update state
    setWishlist(wishlist.filter(item => item.id !== id));
    
    toast.success(`${subscriptionName} removed from wishlist`, successToast);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">My Wishlist</h3>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">❤️</div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Your Wishlist is Empty</h4>
              <p className="text-gray-600 mb-4">
                Add items to your wishlist to save them for later.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Subscriptions
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map(subscription => (
                <div key={subscription.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="relative h-48">
                    <img 
                      src={subscription.thumbnail} 
                      alt={subscription.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(subscription.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-red-500 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{subscription.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{subscription.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-semibold">${subscription.price}/month</span>
                      <Link 
                        to={`/subscription/${subscription.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileWishlist; 