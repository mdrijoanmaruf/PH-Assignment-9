import React from 'react';
import { FaGift, FaTruck, FaMagic, FaBoxOpen } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaGift className="text-4xl text-blue-600" />,
      title: "Curated Products",
      description: "Each box is carefully curated with premium items selected by our experts to match your preferences."
    },
    {
      id: 2,
      icon: <FaTruck className="text-4xl text-blue-600" />,
      title: "Free Shipping",
      description: "Enjoy free shipping on all subscription boxes within the continental United States."
    },
    {
      id: 3,
      icon: <FaMagic className="text-4xl text-blue-600" />,
      title: "Surprise Items",
      description: "Every box includes a special surprise item that's not listed to make each delivery exciting."
    },
    {
      id: 4,
      icon: <FaBoxOpen className="text-4xl text-blue-600" />,
      title: "Flexible Subscriptions",
      description: "Choose monthly, quarterly, or annual plans with the option to skip or cancel anytime."
    }
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="md:max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Our Box</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover what makes our subscription boxes stand out from the rest
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="mb-6 max-w-2xl mx-auto">Join thousands of happy subscribers and receive your first box within days!</p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features; 