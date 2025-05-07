import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const SubscriptionServices = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Array of color schemes for each card
  const colorSchemes = [
    { bg: 'bg-blue-50', accent: 'bg-blue-600', text: 'text-blue-600', hover: 'hover:bg-blue-200' },
    { bg: 'bg-rose-50', accent: 'bg-rose-600', text: 'text-rose-600', hover: 'hover:bg-rose-200' },
    { bg: 'bg-green-50', accent: 'bg-green-600', text: 'text-green-600', hover: 'hover:bg-green-200' },
    { bg: 'bg-purple-50', accent: 'bg-purple-600', text: 'text-purple-600', hover: 'hover:bg-purple-200' },
    { bg: 'bg-amber-50', accent: 'bg-amber-600', text: 'text-amber-600', hover: 'hover:bg-amber-200' },
    { bg: 'bg-teal-50', accent: 'bg-teal-600', text: 'text-teal-600', hover: 'hover:bg-teal-200' },
    { bg: 'bg-indigo-50', accent: 'bg-indigo-600', text: 'text-indigo-600', hover: 'hover:bg-indigo-200' },
    { bg: 'bg-pink-50', accent: 'bg-pink-600', text: 'text-pink-600', hover: 'hover:bg-pink-200' }
  ];

  useEffect(() => {
    fetch('/data/subscriptions.json')
      .then(res => res.json())
      .then(data => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subscription data:', error);
        setLoading(false);
      });
  }, []);

  // Display all cards or just the first 6 based on showAll state
  const displayedSubscriptions = showAll 
    ? subscriptions 
    : subscriptions.slice(0, 6);

  return (
    <section id="subscription-services" className="py-16 bg-gray-50">
      <div className="md:max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Subscription Boxes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated subscription boxes that bring joy and excitement to your doorstep every month.
            From beauty essentials to smart home gadgets, we have something for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {loading ? (
            // Skeleton loader cards
            [...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="h-3 bg-gray-300 rounded w-1/3 mb-3"></div>
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            displayedSubscriptions.map((subscription, index) => {
              // Get the color scheme for this card (cycle through available schemes)
              const colorScheme = colorSchemes[index % colorSchemes.length];
              
              return (
                <div 
                  key={subscription.id} 
                  className={`${colorScheme.bg} rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={subscription.thumbnail} 
                      alt={subscription.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-0 right-0 ${colorScheme.accent} text-white px-3 py-1 m-2 rounded-full text-xs font-semibold`}>
                      {subscription.frequency}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-2">
                      <span className={`text-xs font-semibold ${colorScheme.text} uppercase tracking-wider`}>
                        {subscription.tech_category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{subscription.name}</h3>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <p className={`text-2xl font-bold ${colorScheme.text}`}>
                        ৳{subscription.price.toLocaleString()}
                      </p>
                      <Link 
                        to={`/subscription/${subscription.id}`} 
                        className={`inline-flex items-center justify-center px-4 py-2 bg-white text-gray-800 font-medium rounded-lg ${colorScheme.hover} transition-colors border border-gray-200`}
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {!loading && subscriptions.length > 6 && !showAll && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              View All Subscriptions
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubscriptionServices; 