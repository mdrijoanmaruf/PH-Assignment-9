import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredBoxes = [
    {
      id: 1,
      name: "Beauty Box",
      description: "Premium skincare and makeup products",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: 39.99,
      rating: 4.8
    },
    {
      id: 2,
      name: "Fitness Box",
      description: "Exercise equipment and health supplements",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: 49.99,
      rating: 4.7
    },
    {
      id: 3,
      name: "Gourmet Box",
      description: "Artisanal foods and specialty treats",
      image: "https://images.unsplash.com/photo-1535912259434-33e1ec606fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: 59.99,
      rating: 4.9
    },
    {
      id: 4,
      name: "Tech Box",
      description: "Latest gadgets and accessories",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: 69.99,
      rating: 4.6
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredBoxes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredBoxes.length - 1 : prev - 1));
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Subscription Boxes</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our most popular subscription options and find the perfect box for you.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredBoxes.map((box) => (
                <div key={box.id} className="min-w-full px-4">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto">
                      <img 
                        src={box.image} 
                        alt={box.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(box.rating) ? "text-yellow-400" : "text-gray-300"} />
                          ))}
                        </div>
                        <span className="text-gray-600 ml-2">{box.rating}/5</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{box.name}</h3>
                      <p className="text-gray-600 mb-4">{box.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">${box.price.toFixed(2)}<span className="text-sm text-gray-500">/month</span></span>
                        <button className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-lg transition">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg text-blue-600 hover:bg-blue-600 hover:text-white transition z-10"
          >
            <FaArrowLeft />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg text-blue-600 hover:bg-blue-600 hover:text-white transition z-10"
          >
            <FaArrowRight />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredBoxes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider; 