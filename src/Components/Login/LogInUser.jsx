import React, { useContext, useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  InputField, 
  PrimaryButton, 
  AccountToggle 
} from './FormComponents';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialAuth from './SocialAuth';
import toast from 'react-hot-toast';
import { successToast, errorToast } from '../../utils/toastConfig';
import PageTitle from '../PageTitle';

const LogInUser = () => {
  const { logInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [redirectMessage, setRedirectMessage] = useState("");

  // Generate dynamic message based on the path user was trying to access
  useEffect(() => {
    if (location.state?.from) {
      const path = location.state.from.pathname;
      
      if (path.includes('/subscription/')) {
        setRedirectMessage("Please log in to access the subscription details you were viewing.");
      } else if (path === '/subscriptions') {
        setRedirectMessage("Please log in to view your subscriptions.");
      } else if (path === '/profile') {
        setRedirectMessage("Please log in to access your profile.");
      } else if (path.includes('/blog/')) {
        setRedirectMessage("Please log in to view the full blog post.");
      } else {
        setRedirectMessage(`Please log in to access ${path.replace('/', '')}.`);
      }
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const enteredEmail = formData.email;
    const enteredPassword = formData.password;
    
    logInUser(enteredEmail, enteredPassword)
    .then(result => {
      const user = result.user;
      console.log(user);
        
        toast.success('Successfully signed in!', successToast);
        
        // Navigate to the page the user was trying to access
        navigate(from, { replace: true });
      })
      .catch(error => {
      console.log(error.code);
        toast.error(`Sign in failed: ${error.message}`, errorToast);
    })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <PageTitle title="Login" />
      <div className="md:py-20 py-8 px-3 md:px-0 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-0 max-w-5xl w-full overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Title and Social Login */}
            <div className="bg-blue-600 text-white p-6 md:p-8 md:w-2/5 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-3">Welcome Back</h2>
                <p className="text-blue-100">
                  Sign in to your account to manage your subscriptions and profile.
                </p>
                {location.state?.from && redirectMessage && (
                  <div className="mt-4 bg-blue-700 p-3 rounded-lg">
                    <p className="text-sm text-blue-100">
                      {redirectMessage}
                    </p>
                  </div>
                )}
              </div>
              
              <SocialAuth darkMode={true} />
              
              <div>
                <AccountToggle hasAccount={true} dark={true} />
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <InputField
                  icon={<FaEnvelope className="text-gray-400" />}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@example.com"
                  required
                />

                <div>
                  <InputField
                    icon={<FaLock className="text-gray-400" />}
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link 
                        to="/forgot-password" 
                        state={{ email: formData.email }}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <PrimaryButton type="submit" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInUser; 