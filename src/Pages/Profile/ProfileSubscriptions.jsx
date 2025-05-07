import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSubscriptions = ({ user, subscriptions, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">My Subscriptions</h3>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {subscriptions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">📦</div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">No Active Subscriptions</h4>
              <p className="text-gray-600 mb-4">
                You don't have any active subscriptions at the moment.
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
              {subscriptions.map(subscription => (
                <div key={subscription.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="relative h-48">
                    <img 
                      src={subscription.thumbnail} 
                      alt={subscription.name}
                      className="w-full h-full object-cover"
                    />
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

export default ProfileSubscriptions; 