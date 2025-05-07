import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt, FaShippingFast, FaCalendarAlt } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { successToast, errorToast } from '../utils/toastConfig';
import PageTitle from '../Components/PageTitle';

const MySubscriptions = () => {
  const { user } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allSubscriptionData, setAllSubscriptionData] = useState([]);

  useEffect(() => {
    // Fetch all subscription data first
    fetch('/data/subscriptions.json')
      .then(res => res.json())
      .then(data => {
        setAllSubscriptionData(data);
        
        // Get user subscriptions from localStorage
        const userEmail = user?.email;
        if (userEmail) {
          const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
          const userSubscriptions = savedSubscriptions[userEmail] || [];
          
          // Map subscription IDs to full subscription data
          const userSubscriptionDetails = userSubscriptions.map(subId => {
            return data.find(sub => sub.id === subId);
          }).filter(Boolean); // Remove any undefined values
          
          setSubscriptions(userSubscriptionDetails);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subscription data:', error);
        toast.error('Failed to load subscription data', errorToast);
        setLoading(false);
      });
  }, [user]);

  const handleRemoveSubscription = (subscriptionId) => {
    // Get current user subscriptions
    const userEmail = user?.email;
    if (!userEmail) {
      toast.error('You must be logged in to manage subscriptions', errorToast);
      return;
    }
    
    const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
    const userSubscriptions = savedSubscriptions[userEmail] || [];
    
    // Find subscription name before removing
    const subscription = subscriptions.find(sub => sub.id === subscriptionId);
    const subscriptionName = subscription ? subscription.name : 'Subscription';
    
    // Confirm removal
    if (!confirm(`Are you sure you want to remove "${subscriptionName}" from your subscriptions?`)) {
      return;
    }
    
    // Remove the subscription
    const updatedUserSubscriptions = userSubscriptions.filter(id => id !== subscriptionId);
    
    // Update localStorage
    savedSubscriptions[userEmail] = updatedUserSubscriptions;
    localStorage.setItem('userSubscriptions', JSON.stringify(savedSubscriptions));
    
    // Update state
    setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
    
    // Show success toast
    toast.success(`${subscriptionName} removed successfully`, successToast);
  };

  // Skeleton loader for loading state
  const SkeletonLoader = () => (
    <>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse mb-6">
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 h-40 bg-gray-300 rounded"></div>
            <div className="flex-grow">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-5"></div>
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <PageTitle title="My Subscriptions" />
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">My Subscriptions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manage your active subscription boxes and keep track of your deliveries.
            </p>
          </div>

          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {subscriptions.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
                  <div className="text-gray-400 text-5xl mb-4">📦</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Subscriptions</h2>
                  <p className="text-gray-600 mb-6">
                    You don't have any active subscriptions at the moment. 
                    Browse our collection and subscribe to get exciting boxes delivered to your doorstep.
                  </p>
                  <Link 
                    to="/" 
                    className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Subscriptions
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {subscriptions.map((subscription) => (
                      <div key={subscription.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 flex flex-col md:flex-row gap-6">
                          {/* Subscription Image */}
                          <div className="w-full md:w-1/4 h-40">
                            <img 
                              src={subscription.thumbnail} 
                              alt={subscription.name} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          
                          {/* Subscription Details */}
                          <div className="flex-grow">
                            <div className="flex flex-wrap justify-between items-start mb-3">
                              <h2 className="text-xl font-bold text-gray-800">{subscription.name}</h2>
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {subscription.tech_category}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{subscription.description}</p>
                            
                            <div className="flex flex-wrap gap-4 mb-4">
                              <div className="flex items-center text-gray-600">
                                <FaCalendarAlt className="mr-2 text-blue-600" />
                                {subscription.frequency} delivery
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaShippingFast className="mr-2 text-blue-600" />
                                Free shipping
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap justify-between items-center mt-2">
                              <span className="text-xl font-bold text-blue-600">৳{subscription.price.toLocaleString()}</span>
                              <div className="flex gap-3">
                                <Link 
                                  to={`/subscription/${subscription.id}`} 
                                  className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                  View Details
                                </Link>
                                <button 
                                  onClick={() => handleRemoveSubscription(subscription.id)}
                                  className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center"
                                >
                                  <FaRegTrashAlt className="mr-2" /> Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-10">
                    <Link 
                      to="/" 
                      className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Browse More Subscriptions
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MySubscriptions; 