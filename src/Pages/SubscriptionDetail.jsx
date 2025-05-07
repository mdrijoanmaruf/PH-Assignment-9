import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaChevronLeft, FaShippingFast, FaCalendarAlt, FaRegClock, FaCheck, FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, Timestamp, doc, deleteDoc } from 'firebase/firestore';
import app from '../firebase.config';
import { successToast, errorToast, infoToast } from '../utils/toastConfig';
import PageTitle from '../Components/PageTitle';

const SubscriptionDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Initialize Firestore
  const db = getFirestore(app);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    fetch('/data/subscriptions.json')
      .then(res => res.json())
      .then(data => {
        const foundSubscription = data.find(sub => sub.id === parseInt(id));
        setSubscription(foundSubscription);
        setLoading(false);
        
        // Check if user is already subscribed
        if (user?.email) {
          const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
          const userSubscriptions = savedSubscriptions[user.email] || [];
          setIsSubscribed(userSubscriptions.includes(parseInt(id)));
          
          // Check if already in wishlist
          const wishlist = JSON.parse(localStorage.getItem('userWishlist')) || {};
          const userWishlist = wishlist[user.email] || [];
          setIsWishlisted(userWishlist.includes(parseInt(id)));
        }
      })
      .catch(error => {
        console.error('Error fetching subscription data:', error);
        setLoading(false);
      });
      
    // Fetch reviews
    fetchReviews();
  }, [id, user]);

  // Fetch reviews from Firestore
  const fetchReviews = async () => {
    try {
      setReviewLoading(true);
      console.log(`Fetching reviews for subscription ID: ${id}`);
      
      const reviewsRef = collection(db, 'CustomerReviews');
      
      // First, check if the collection exists and has any documents
      const checkSnapshot = await getDocs(reviewsRef);
      console.log(`Total CustomerReviews documents: ${checkSnapshot.size}`);
      
      // Log all documents in CustomerReviews for debugging
      const allReviews = [];
      checkSnapshot.forEach(doc => {
        allReviews.push({id: doc.id, ...doc.data()});
      });
      console.log('All reviews in CustomerReviews collection:', allReviews);
      
      // Now query for this specific subscription - making sure to use the correct type
      const subscriptionId = parseInt(id);
      const q = query(
        reviewsRef,
        where('subscriptionId', '==', subscriptionId)
      );
      
      const querySnapshot = await getDocs(q);
      console.log(`Found ${querySnapshot.size} reviews for subscription ID: ${subscriptionId}`);
      
      const reviewsList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`Review document data:`, data);
        reviewsList.push({ id: doc.id, ...data });
      });
      
      // Sort reviews manually by createdAt timestamp
      reviewsList.sort((a, b) => {
        // Try to handle different timestamp formats
        const getTime = (timestamp) => {
          if (!timestamp) return 0;
          if (timestamp instanceof Date) return timestamp.getTime();
          if (timestamp.toDate) return timestamp.toDate().getTime();
          if (timestamp.seconds) return timestamp.seconds * 1000;
          return 0;
        };
        
        return getTime(b.createdAt) - getTime(a.createdAt);
      });
      
      console.log('Sorted reviews to display:', reviewsList);
      setReviews(reviewsList);
      setReviewLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      console.error('Error details:', error.code, error.message);
      setReviewLoading(false);
    }
  };

  // Submit a review to Firestore
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to submit a review', errorToast);
      return;
    }

    // Check if user is subscribed
    const userEmail = user.email;
    const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
    const userSubscriptions = savedSubscriptions[userEmail] || [];
    
    if (!userSubscriptions.includes(parseInt(id))) {
      toast.error('You must be subscribed to this box to leave a review', errorToast);
      return;
    }
    
    if (!reviewText.trim()) {
      toast.error('Please enter a review', errorToast);
      return;
    }
    
    try {
      // Use a separate state for submission
      setSubmitLoading(true);
      
      // Make sure subscriptionId is an integer
      const subscriptionId = parseInt(id);
      console.log(`Submitting review for subscription ID: ${subscriptionId}, type: ${typeof subscriptionId}`);
      
      // Create review data with manually set timestamp to avoid serverTimestamp() issues
      const now = new Date();
      const reviewData = {
        subscriptionId: subscriptionId,
        userId: user.uid,
        userName: user.displayName || user.email,
        userEmail: user.email,
        userPhoto: user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName,
        rating: rating,
        review: reviewText,
        createdAt: {
          seconds: Math.floor(now.getTime() / 1000),
          nanoseconds: 0
        }
      };
      
      console.log('Submitting review data:', reviewData);
      const docRef = await addDoc(collection(db, 'CustomerReviews'), reviewData);
      console.log('Review document added with ID:', docRef.id);
      
      // Add the new review to the reviews list immediately
      const newReview = {
        id: docRef.id,
        ...reviewData
      };
      setReviews(prevReviews => [newReview, ...prevReviews]);
      
      toast.success('Review submitted successfully!', successToast);
      setReviewText('');
      setRating(5);
      
      // Refresh reviews after a short delay to confirm persistence
      setTimeout(() => {
        fetchReviews();
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      console.error('Error details:', error.code, error.message);
      toast.error('Failed to submit review. Please try again.', errorToast);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubscribe = () => {
    if (!user) {
      // Redirect to login page using window.location
      window.location.href = '/login';
      return;
    }
    
    const subscriptionId = parseInt(id);
    const userEmail = user.email;
    
    // Get current user subscriptions from localStorage
    const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
    const userSubscriptions = savedSubscriptions[userEmail] || [];
    
    // Add subscription ID if not already subscribed
    if (!userSubscriptions.includes(subscriptionId)) {
      setSubscribeLoading(true);
      
      // Simulate a network delay (can be removed if real network calls are made)
      setTimeout(() => {
        userSubscriptions.push(subscriptionId);
        savedSubscriptions[userEmail] = userSubscriptions;
        localStorage.setItem('userSubscriptions', JSON.stringify(savedSubscriptions));
        setIsSubscribed(true);
        setSubscribeLoading(false);
        
        // Show success toast notification - using onClick handler instead of Link
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">Successfully subscribed!</span>
            <button 
              onClick={() => window.location.href = '/subscriptions'} 
              className="text-sm underline mt-1 text-left"
            >
              View My Subscriptions
            </button>
          </div>,
          successToast
        );

        // If this was triggered from the review section, scroll to the review form
        setTimeout(() => {
          const reviewSection = document.querySelector('.review-section');
          if (reviewSection) {
            reviewSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000);
      }, 800); // Simulated delay
    }
  };
  
  const handleUnsubscribe = () => {
    const subscriptionId = parseInt(id);
    const userEmail = user.email;
    
    setSubscribeLoading(true);
    
    // Simulate a network delay
    setTimeout(() => {
      // Get current user subscriptions
      const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
      const userSubscriptions = savedSubscriptions[userEmail] || [];
      
      // Remove subscription ID
      const updatedSubscriptions = userSubscriptions.filter(id => id !== subscriptionId);
      savedSubscriptions[userEmail] = updatedSubscriptions;
      localStorage.setItem('userSubscriptions', JSON.stringify(savedSubscriptions));
      
      setIsSubscribed(false);
      setSubscribeLoading(false);
      
      // Show unsubscribe toast notification
      toast.success('Successfully unsubscribed', successToast);
    }, 800); // Simulated delay
  };
  
  const handleWishlistToggle = () => {
    if (!user) {
      // Redirect to login page using window.location
      window.location.href = '/login';
      return;
    }
    
    setWishlistLoading(true);
    
    const subscriptionId = parseInt(id);
    const userEmail = user.email;
    
    // Simulate a network delay
    setTimeout(() => {
      // Get current user wishlist from localStorage
      const wishlist = JSON.parse(localStorage.getItem('userWishlist')) || {};
      const userWishlist = wishlist[userEmail] || [];
      
      if (isWishlisted) {
        // Remove from wishlist
        const updatedWishlist = userWishlist.filter(id => id !== subscriptionId);
        wishlist[userEmail] = updatedWishlist;
        localStorage.setItem('userWishlist', JSON.stringify(wishlist));
        setIsWishlisted(false);
        toast.success('Removed from wishlist', successToast);
      } else {
        // Add to wishlist
        userWishlist.push(subscriptionId);
        wishlist[userEmail] = userWishlist;
        localStorage.setItem('userWishlist', JSON.stringify(wishlist));
        setIsWishlisted(true);
        toast.success('Added to wishlist', successToast);
      }
      
      setWishlistLoading(false);
    }, 600); // Simulated delay
  };

  // Delete a review
  const handleDeleteReview = async (reviewId, reviewUserId) => {
    try {
      // Check if current user is the review owner
      if (!user || user.uid !== reviewUserId) {
        toast.error('You can only delete your own reviews', errorToast);
        return;
      }
      
      // Confirm deletion
      if (!confirm('Are you sure you want to delete this review?')) {
        return;
      }
      
      setDeleteLoading(reviewId);
      console.log(`Deleting review with ID: ${reviewId}`);
      
      // Delete from Firestore
      const reviewRef = doc(db, 'CustomerReviews', reviewId);
      await deleteDoc(reviewRef);
      
      // Remove from UI
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      
      toast.success('Review deleted successfully', successToast);
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review. Please try again.', errorToast);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscription Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the subscription you're looking for.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaChevronLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle title={subscription ? subscription.name : 'Subscription Details'} />
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Hero banner */}
        <div className="w-full h-64 md:h-96 relative mb-8">
          <img 
            src={subscription.banner} 
            alt={subscription.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container mx-auto px-4 py-6">
              <Link to="/" className="inline-flex items-center text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-4 hover:bg-white/30 transition-colors">
                <FaChevronLeft className="mr-2" /> Back to All Boxes
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{subscription.name}</h1>
              <div className="flex items-center text-white/90 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(subscription.ratings) ? "text-yellow-400" : "text-gray-400"} 
                    />
                  ))}
                </div>
                <span className="ml-2">{subscription.ratings} ({subscription.number_of_reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Main details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {subscription.tech_category}
                  </span>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <FaCalendarAlt className="text-blue-600 mr-2" />
                    <span className="text-gray-700">{subscription.frequency} delivery</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Box</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {subscription.description}
                </p>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">What's Included</h3>
                <ul className="space-y-3 mb-8">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">Subscription Benefits</h3>
                <ul className="space-y-3 mb-6">
                  {subscription.subscription_benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Customer Reviews Section */}
                <div className="mt-12 review-section">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
                  
                  {/* Review Form */}
                  {user ? (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
                      {isSubscribed ? (
                        <form onSubmit={handleReviewSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                              Rating
                            </label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setRating(star)}
                                  className="text-2xl focus:outline-none"
                                >
                                  <FaStar
                                    className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label htmlFor="review" className="block text-gray-700 font-medium mb-2">
                              Your Review
                            </label>
                            <textarea
                              id="review"
                              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                              rows="4"
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              placeholder="Share your experience with this subscription box..."
                              required
                              disabled={submitLoading}
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            disabled={submitLoading || !reviewText.trim()}
                            className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                          >
                            {/* Only show animation when submitting a review, not when loading review data */}
                            {submitLoading && reviewText.trim() ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                              </span>
                            ) : 'Submit Review'}
                          </button>
                        </form>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                          <p className="text-gray-700 mb-4">
                            You need to subscribe to this box before you can leave a review.
                          </p>
                          <button
                            onClick={handleSubscribe}
                            disabled={subscribeLoading}
                            className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                          >
                            {subscribeLoading ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : 'Subscribe Now'}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                      <p className="text-gray-700 mb-4">
                        Please <Link to="/login" className="text-blue-600 font-medium">sign in</Link> to leave a review.
                      </p>
                    </div>
                  )}
                  
                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviewLoading && reviews.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading reviews...</p>
                      </div>
                    ) : reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex items-start">
                            <img 
                              src={review.userPhoto} 
                              alt={review.userName} 
                              className="w-10 h-10 rounded-full mr-4"
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h5 className="font-medium text-gray-800">{review.userName}</h5>
                                {user && user.uid === review.userId && (
                                  <button 
                                    onClick={() => handleDeleteReview(review.id, review.userId)}
                                    className={`p-1 ${deleteLoading === review.id ? 'text-gray-400' : 'text-red-500 hover:text-red-700'}`}
                                    title="Delete review"
                                    disabled={deleteLoading === review.id}
                                  >
                                    {deleteLoading === review.id ? (
                                      <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                      </span>
                                    ) : (
                                      <FaTrash size={14} />
                                    )}
                                  </button>
                                )}
                              </div>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar 
                                    key={i} 
                                    className={i < review.rating ? "text-yellow-400 text-sm" : "text-gray-300 text-sm"} 
                                  />
                                ))}
                                <span className="text-gray-500 text-sm ml-2">
                                  {formatReviewDate(review.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-700">{review.review}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No reviews yet. Be the first to review this subscription!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Pricing and order */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Subscription Details</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-2xl font-bold text-blue-600">৳{subscription.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium">{subscription.frequency}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{subscription.tech_category}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Shipping:</span>
                    <div className="flex items-center text-green-600">
                      <FaShippingFast className="mr-1" />
                      <span>Free Delivery</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Shipping Time:</span>
                    <span className="text-gray-800">1-3 Business Days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Next Charge:</span>
                    <span className="text-gray-800">Upon Delivery</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {isSubscribed ? (
                    <button
                      onClick={handleUnsubscribe}
                      disabled={subscribeLoading}
                      className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center disabled:bg-red-400 disabled:cursor-not-allowed"
                    >
                      {subscribeLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : 'Unsubscribe'}
                    </button>
                  ) : (
                    <button
                      onClick={handleSubscribe}
                      disabled={subscribeLoading}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                      {subscribeLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : 'Subscribe Now'}
                    </button>
                  )}
                  
                  <button
                    onClick={handleWishlistToggle}
                    disabled={wishlistLoading}
                    className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    {wishlistLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : isWishlisted ? (
                      <>
                        <FaHeart className="text-red-500 mr-2" />
                        Remove from Wishlist
                      </>
                    ) : (
                      <>
                        <FaRegHeart className="mr-2" />
                        Add to Wishlist
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaCheck className="text-green-500 mr-2" />
                    <span className="text-gray-700">Flexible Cancellation</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaCheck className="text-green-500 mr-2" />
                    <span className="text-gray-700">Pause Anytime</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span className="text-gray-700">Gift Options Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to format review dates
const formatReviewDate = (dateObj) => {
  if (!dateObj) return 'Just now';
  
  // Handle Firestore Timestamp
  if (dateObj && typeof dateObj.toDate === 'function') {
    return dateObj.toDate().toLocaleDateString();
  }
  
  // Handle Date object
  if (dateObj instanceof Date) {
    return dateObj.toLocaleDateString();
  }
  
  // Handle timestamp as seconds/nanoseconds object
  if (dateObj && dateObj.seconds) {
    return new Date(dateObj.seconds * 1000).toLocaleDateString();
  }
  
  // Handle string date
  if (typeof dateObj === 'string') {
    try {
      return new Date(dateObj).toLocaleDateString();
    } catch (e) {
      return 'Unknown date';
    }
  }
  
  return 'Just now';
};

export default SubscriptionDetail; 