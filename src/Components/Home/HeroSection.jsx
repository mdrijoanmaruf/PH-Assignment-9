import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { FaBox, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaStar, FaQuoteLeft, FaGift } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

// Import custom styles
import './SwiperStyles.css';

// Import required modules
import { Pagination, Navigation, Autoplay, EffectCards } from 'swiper/modules';

const HeroSection = () => {
  const { user } = useContext(AuthContext);

  const scrollToSubscriptions = () => {
    const subscriptionSection = document.getElementById('subscription-services');
    if (subscriptionSection) {
      subscriptionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
      <div className="md:max-w-7xl mx-auto px-3 sm:px-4 py-10 md:py-24">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left column - content */}
          <div className="md:w-1/2 flex flex-col w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              Discover Amazing Products Every Month
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
              Join our subscription box service and receive carefully curated items delivered 
              right to your doorstep. Perfect for those who love surprises!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center">
              {user ? (
                <button 
                  onClick={scrollToSubscriptions}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition duration-300 shadow-lg w-full sm:w-auto"
                >
                  <FaBox /> Browse Subscriptions
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition duration-300 shadow-lg w-full sm:w-auto"
                >
                  <FaBox /> Get Started
                </Link>
              )}
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-0">
                <a href="https://www.facebook.com/md.rijoanmaruf" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all">
                  <FaFacebook size={18} className="sm:text-xl" />
                </a>
                <a href="https://github.com/mdrijoanmaruf" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all">
                  <FaGithub size={18} className="sm:text-xl" />
                </a>
                <a href="https://www.instagram.com/rijoanmaruf/" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all">
                  <FaInstagram size={18} className="sm:text-xl" />
                </a>
                <a href="https://www.linkedin.com/in/mdrijoanmaruf/" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all">
                  <FaLinkedin size={18} className="sm:text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Right column - slider */}
          <div className="md:w-1/2 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
            <div className="w-full relative">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[EffectCards, Pagination, Navigation, Autoplay]}
                className="mySwiper"
              >
                {/* Slide 1 - Beauty Box */}
                <SwiperSlide>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl">
                    <div className="bg-pink-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex justify-center">
                      <FaGift className="text-4xl sm:text-5xl text-pink-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 text-center">Beauty Box</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-center">Premium skincare and makeup products</p>
                    <div className="flex justify-center space-x-1 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 2 - Fitness Box */}
                <SwiperSlide>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl">
                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex justify-center">
                      <FaBox className="text-4xl sm:text-5xl text-blue-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 text-center">Fitness Box</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-center">Exercise equipment and supplements</p>
                    <div className="flex justify-center space-x-1 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-4/5"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 3 - Gourmet Box */}
                <SwiperSlide>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl">
                    <div className="bg-green-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex justify-center">
                      <FaBox className="text-4xl sm:text-5xl text-green-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 text-center">Gourmet Box</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-center">Artisanal foods and specialty treats</p>
                    <div className="flex justify-center space-x-1 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-5/6"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 4 - Tech Box */}
                <SwiperSlide>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl">
                    <div className="bg-purple-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex justify-center">
                      <FaBox className="text-4xl sm:text-5xl text-purple-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 text-center">Tech Box</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-center">Latest gadgets and accessories</p>
                    <div className="flex justify-center space-x-1 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 5 - Book Box */}
                <SwiperSlide>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl">
                    <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex justify-center">
                      <FaBox className="text-4xl sm:text-5xl text-yellow-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 text-center">Book Box</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-center">Curated books and reading accessories</p>
                    <div className="flex justify-center space-x-1 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              
              {/* Badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-yellow-400 text-blue-900 font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg transform rotate-12 z-10 text-sm sm:text-base">
                New!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 