import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaChevronRight, FaTag, FaFilter } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageTitle from '../PageTitle';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Initialize AOS with faster animations
    AOS.init({
      duration: 400, // Reduced from 800 to 400 for faster animations
      once: true, // Changed to true to prevent repeated animations
      mirror: false,
    });

    // Fetch blogs from JSON file
    fetch('/data/blogs.json')
      .then(response => response.json())
      .then(data => {
        setBlogs(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(blog => blog.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  // Filter blogs based on category
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === '' || blog.category === selectedCategory;
    return matchesCategory;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Count blog posts per category
  const blogCounts = categories.reduce((acc, category) => {
    acc[category] = blogs.filter(blog => blog.category === category).length;
    return acc;
  }, {});

  return (
    <>
      <PageTitle title="Blog" />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
          <div className=" mx-auto max-w-7xl" data-aos="fade-down" data-aos-duration="300">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Subscription Box Blog</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Discover the latest trends, tips, and insights about subscription boxes and curated experiences.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="container mx-auto md:max-w-7xl px-4 py-8">
          <div className="bg-white mt-4 rounded-xl shadow-lg p-6 mb-8 transform  relative z-10" data-aos="fade-up" data-aos-duration="300">
            <div className="flex  items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaFilter className="text-blue-600 mr-2" /> 
                Browse by Category
              </h2>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory('')}
                  className="text-blue-600 text-sm font-medium hover:underline flex items-center"
                >
                  Clear filter
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <button
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === '' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory('')}
              >
                All Topics
                <span className="ml-1 text-xs font-normal">({blogs.length})</span>
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                  <span className="ml-1 text-xs font-normal">({blogCounts[category]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Blog Listing */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12" data-aos="fade-up" data-aos-duration="300">
              <h3 className="text-xl text-gray-600">No blog posts found matching your criteria.</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filter.</p>
            </div>
          ) : (
            <>
              {/* Display a heading for the selected category */}
              {selectedCategory && (
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up" data-aos-duration="300">
                  {selectedCategory} Blogs
                </h2>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <div 
                    key={blog.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    data-aos="fade-up"
                    data-aos-duration="300"
                    data-aos-delay={index < 6 ? index * 50 : 0} // Reduced delay and only apply to first 6 items
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium flex items-center">
                        <FaTag className="mr-1" />
                        {blog.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {formatDate(blog.date)}
                        </div>
                        <div className="flex items-center">
                          <FaUser className="mr-1" />
                          {blog.author}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.content}
                      </p>
                      <Link to={`/blog/${blog.id}`} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                        Read More <FaChevronRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog; 