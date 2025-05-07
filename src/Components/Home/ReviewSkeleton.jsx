import React from 'react';

const ReviewSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col animate-pulse">
      {/* Quote icon placeholder */}
      <div className="mb-4 w-6 h-6 bg-gray-200 rounded-full"></div>
      
      {/* Review text placeholders */}
      <div className="space-y-2 mb-6 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
      
      {/* User info placeholders */}
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32 mb-1"></div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSkeleton; 