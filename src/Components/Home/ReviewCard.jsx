import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="mb-4 text-blue-500">
        <FaQuoteLeft className="text-2xl opacity-50" />
      </div>
      
      <p className="text-gray-600 italic mb-6 flex-grow leading-relaxed">{review.text}</p>
      
      <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
        <img 
          src={review.image} 
          alt={review.name} 
          className="w-12 h-12 rounded-full mr-4 object-cover shadow-sm"
        />
        <div>
          <h4 className="font-bold text-gray-800">{review.name}</h4>
          <p className="text-sm text-gray-500">{review.subscription} Subscriber</p>
          <div className="flex text-yellow-400 mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                size={14} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard; 