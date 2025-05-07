import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBoxOpen,
  FaSignInAlt,
  FaBlog,
  FaHeart,
  FaCog,
} from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdOutlineLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { successToast, errorToast } from "../../utils/toastConfig";
import PageTitle from "../PageTitle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Get the page title based on the current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/") return "Home";
    if (path === "/login") return "Login";
    if (path === "/signup") return "Sign Up";
    if (path === "/forgot-password") return "Forgot Password";
    if (path === "/blog") return "Blog";
    if (path.startsWith("/blog/")) return "Blog Post";
    if (path === "/terms-and-conditions") return "Terms and Conditions";
    if (path === "/privacy-policy") return "Privacy Policy";
    if (path.startsWith("/subscription/")) return "Subscription Details";
    if (path === "/subscriptions") return "My Subscriptions";
    if (path === "/profile") return "Profile";
    
    // Default title if no match
    return "Box Subscription";
  };

  const handleLogOut = () => {
    // Show loading toast during logout
    toast.loading('Logging out...', { id: 'logout' });
    
    logOut()
    .then(() => {
      toast.dismiss('logout');
      // Toast is already shown in AuthProvider, so no need to show it here
      setIsProfileOpen(false);
    }).catch((error) => {
      toast.dismiss('logout');
      // Error toast is already shown in AuthProvider
      console.log(error);
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome className="mr-1" /> },
    { path: "/profile", label: "Profile", icon: <FaUser className="mr-1" /> },
    {
      path: "/subscriptions",
      label: "My Subscriptions",
      icon: <FaBoxOpen className="mr-1" />,
    },
    { path: "/blog", label: "Blog", icon: <FaBlog className="mr-1" /> },
  ];

  return (
    <>
      {/* Add PageTitle component with dynamic title */}
      <PageTitle title={getPageTitle()} />
      
      <nav
        className={`fixed top-0 left-0 w-full bg-white shadow z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button and brand */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>

              <NavLink
                to="/"
                className="ml-4 text-xl font-semibold hover:text-gray-900"
              >
                <span className="text-blue-600">Box</span>Subscription
              </NavLink>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-40">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* User controls - right side */}
            <div className="flex items-center space-x-2">
              {/* Login/Logout button */}
              {!user ? (
                <Link to="/login">
                  <button className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors text-green-600 hover:bg-green-50">
                    <FaSignInAlt className="text-base mr-0.5" />
                    <span className="text-sm">Login</span>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleLogOut}
                  className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors text-red-600 hover:bg-green-50"
                >
                  <MdOutlineLogout className="text-base mr-0.5" />
                  <span className="text-sm">Logout</span>
                </button>
              )}

              {/* User profile image - always show when logged in */}
              {user && (
                <div className="relative">
                  <Link
                    to="/profile"
                    className="flex items-center text-sm rounded-full focus:outline-none cursor-pointer"
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-blue-500 ring-offset-1 overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt="User profile"
                      />
                    </div>
                  </Link>

                  {isProfileOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-3 px-4 bg-white ring-1 ring-black ring-opacity-5 z-50"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {user.email}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
