import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaUser, FaEnvelope, FaBoxOpen, FaHeart, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';
import PageTitle from '../../Components/PageTitle';
import ProfileInfo from './ProfileInfo';
import ProfileDetails from './ProfileDetails';
import ProfileSubscriptions from './ProfileSubscriptions';
import ProfileWishlist from './ProfileWishlist';
import ProfileSettings from './ProfileSettings';

const ProfileMain = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [subscriptions, setSubscriptions] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allSubscriptionData, setAllSubscriptionData] = useState([]);

  // Check for tab selection from URL hash
  useEffect(() => {
    // Check if we have a hash in the URL (e.g., #wishlist, #settings)
    const hash = window.location.hash.replace('#', '');
    if (hash && ['profile', 'details', 'subscriptions', 'wishlist', 'settings'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Fetch subscription data
  useEffect(() => {
    if (!user) return;
    
    fetch('/data/subscriptions.json')
      .then(res => res.json())
      .then(data => {
        setAllSubscriptionData(data);
        
        // Get user subscriptions from localStorage
        const userEmail = user.email;
        const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
        const userSubscriptions = savedSubscriptions[userEmail] || [];
        
        // Map subscription IDs to full subscription data
        const userSubscriptionDetails = userSubscriptions.map(subId => {
          return data.find(sub => sub.id === subId);
        }).filter(Boolean);
        
        setSubscriptions(userSubscriptionDetails);
        
        // Get user wishlist
        const savedWishlist = JSON.parse(localStorage.getItem('userWishlist')) || {};
        const userWishlist = savedWishlist[userEmail] || [];
        
        // Map wishlist IDs to full subscription data
        const userWishlistDetails = userWishlist.map(subId => {
          return data.find(sub => sub.id === subId);
        }).filter(Boolean);
        
        setWishlist(userWishlistDetails);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subscription data:', error);
        setLoading(false);
      });
  }, [user]);

  // Get the page title based on active tab
  const getPageTitle = () => {
    switch(activeTab) {
      case 'profile':
        return 'My Profile';
      case 'details':
        return 'Profile Details';
      case 'subscriptions':
        return 'My Subscriptions';
      case 'wishlist':
        return 'My Wishlist';
      case 'settings':
        return 'Account Settings';
      default:
        return 'Profile';
    }
  };

  // Update page title when active tab changes
  useEffect(() => {
    const tabFromUrl = new URLSearchParams(window.location.search).get('tab');
    if (tabFromUrl && ['profile', 'details', 'subscriptions', 'wishlist', 'settings'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, []);

  // Update URL when tab changes
  useEffect(() => {
    // Update the URL with the current tab without full page reload
    const url = new URL(window.location);
    url.searchParams.set('tab', activeTab);
    window.history.pushState({}, '', url);
  }, [activeTab]);

  if (!user) {
    return (
      <>
        <PageTitle title={getPageTitle()} />
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
              <div className="text-gray-400 text-5xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Logged In</h2>
              <p className="text-gray-600 mb-6">
                You need to log in to view your profile.
              </p>
              <Link 
                to="/login" 
                className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const renderProfileContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileInfo user={user} />;
      case 'details':
        return <ProfileDetails user={user} />;
      case 'subscriptions':
        return <ProfileSubscriptions user={user} subscriptions={subscriptions} loading={loading} />;
      case 'wishlist':
        return <ProfileWishlist user={user} wishlist={wishlist} loading={loading} setWishlist={setWishlist} />;
      case 'settings':
        return <ProfileSettings user={user} />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageTitle title={getPageTitle()} />
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Account</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manage your profile, subscriptions, and account settings.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <nav className="space-y-1">
                  <button
                    data-tab="profile"
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'profile' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaUser className="mr-3" />
                    <span>Profile</span>
                  </button>
                  
                  <button
                    data-tab="details"
                    onClick={() => setActiveTab('details')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'details' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaMapMarkerAlt className="mr-3" />
                    <span>Profile Details</span>
                  </button>
                  
                  <button
                    data-tab="subscriptions"
                    onClick={() => setActiveTab('subscriptions')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'subscriptions' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaBoxOpen className="mr-3" />
                    <span>My Subscriptions</span>
                  </button>
                  
                  <button
                    data-tab="wishlist"
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'wishlist' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaHeart className="mr-3" />
                    <span>Wishlist</span>
                  </button>
                  
                  <button
                    data-tab="settings"
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'settings' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaCreditCard className="mr-3" />
                    <span>Account Settings</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              {renderProfileContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMain; 