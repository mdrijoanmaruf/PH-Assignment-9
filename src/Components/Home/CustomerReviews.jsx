import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import ReviewSkeleton from './ReviewSkeleton';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    // Simulate network delay for the loading effect
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/reviews.json');
        const data = await response.json();
        
        // Artificial delay to show the skeleton loader
        setTimeout(() => {
          setReviews(data.reviews);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  // Display first 6 reviews or all reviews based on showAll state
  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);
  
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="md:max-w-7xl  mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full mb-4 inline-block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Subscribers Say</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their lifestyles with our subscription boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            // Skeleton loader
            Array.from({ length: 6 }).map((_, index) => (
              <ReviewSkeleton key={index} />
            ))
          ) : (
            // Actual reviews
            displayedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>

        {!loading && reviews.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={toggleShowAll}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg flex items-center justify-center mx-auto"
            >
              {showAll ? 'Show Less Reviews' : `View All Reviews (${reviews.length})`}
            </button>
          </div>
        )}

        {/* <div className="text-center mt-16 bg-blue-50 p-8 rounded-xl shadow-sm">
          <p className="text-gray-700 font-medium mb-4">Still have questions? We're here to help!</p>
          <a 
            href="mailto:rijoanmaruf@gamil.com" 
            className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
          >
            Contact Support
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default CustomerReviews; 