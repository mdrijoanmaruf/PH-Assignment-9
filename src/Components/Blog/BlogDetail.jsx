import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaTag, FaShare, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageTitle from '../PageTitle';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
    });

    // Scroll to top
    window.scrollTo(0, 0);

    // Fetch blogs from JSON file
    fetch('/data/blogs.json')
      .then(response => response.json())
      .then(data => {
        // Find the current blog
        const currentBlog = data.find(blog => blog.id === parseInt(id));
        setBlog(currentBlog);

        // Find related blogs in the same category
        if (currentBlog) {
          const related = data
            .filter(blog => blog.category === currentBlog.category && blog.id !== currentBlog.id)
            .slice(0, 3);
          setRelatedBlogs(related);
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <h2 className="text-2xl text-gray-700 mb-4">Blog post not found</h2>
        <Link to="/blog" className="inline-flex items-center text-blue-600 font-medium hover:underline">
          <FaArrowLeft className="mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  // Create a longer content for the blog detail page by repeating the content
  const extendedContent = Array(5).fill(blog.content).join(' ');

  return (
    <>
      <PageTitle title={blog ? blog.title : 'Blog Details'} />
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-4xl" data-aos="fade-up">
              <div className="bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded-full inline-flex items-center mb-3">
                <FaTag className="mr-1" />
                {blog.category}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{blog.title}</h1>
              <div className="flex flex-wrap items-center text-white/80 text-sm space-x-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  {formatDate(blog.date)}
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  {blog.author}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10 mb-8" data-aos="fade-up">
            <Link to="/blog" className="inline-flex items-center text-blue-600 font-medium hover:underline mb-6">
              <FaArrowLeft className="mr-2" /> Back to Blog
            </Link>

            {/* Article Content */}
            <div className="prose max-w-none" data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                {extendedContent}
              </p>
            </div>

            {/* Social Share */}
            <div className="mt-8 pt-6 border-t" data-aos="fade-up" data-aos-delay="200">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                <FaShare className="mr-2" /> Share this article
              </h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <FaFacebook />
                </a>
                <a href="#" className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="mb-8" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog, index) => (
                  <div 
                    key={relatedBlog.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100 + 300}
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedBlog.image} 
                        alt={relatedBlog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        <Link to={`/blog/${relatedBlog.id}`}>
                          {relatedBlog.title}
                        </Link>
                      </h4>
                      <div className="flex items-center text-gray-500 text-xs mb-2">
                        <FaCalendarAlt className="mr-1" />
                        {formatDate(relatedBlog.date)}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedBlog.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetail; 