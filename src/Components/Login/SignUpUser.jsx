import React, { useContext, useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaImage } from 'react-icons/fa';
import { 
  InputField, 
  PrimaryButton, 
  AccountToggle 
} from './FormComponents';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialAuth from './SocialAuth';
import toast from 'react-hot-toast';
import { successToast, errorToast, warningToast } from '../../utils/toastConfig';
import PageTitle from '../PageTitle';

const SignUpUser = () => {
  const {createUser, setUser, updateUserProfile} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    photoURL: '',
    email: '',
    password: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasMinLength: false
  });
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const errors = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasMinLength: password.length >= 6
    };
    
    setPasswordErrors(errors);
    return errors.hasUpperCase && errors.hasLowerCase && errors.hasMinLength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate password as user types
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const submittedName = formData.name;
    const submittedPhotoURL = formData.photoURL;
    const submittedEmail = formData.email;
    const submittedPassword = formData.password;
    
    // Show warning toast for empty required fields
    if (!submittedName.trim()) {
      toast.error('Please enter your name', errorToast);
      setLoading(false);
      return;
    }
    
    if (!submittedEmail.trim()) {
      toast.error('Please enter your email', errorToast);
      setLoading(false);
      return;
    }
    
    // Validate password before submission
    if (!validatePassword(submittedPassword)) {
      const missingRequirements = [];
      if (!passwordErrors.hasUpperCase) missingRequirements.push('uppercase letter');
      if (!passwordErrors.hasLowerCase) missingRequirements.push('lowercase letter');
      if (!passwordErrors.hasMinLength) missingRequirements.push('minimum length of 6 characters');
      
      toast.error(
        `Password must have: ${missingRequirements.join(', ')}`,
        errorToast
      );
      setLoading(false);
      return;
    }
    
    toast.loading('Creating your account...', { id: 'signup' });
    
    createUser(submittedEmail, submittedPassword)
    .then(result => {
      const user = result.user;
      console.log(user);
      
      // Update profile with name and photo if provided
      if (submittedName || submittedPhotoURL) {
        updateUserProfile(submittedName, submittedPhotoURL)
          .then(() => {
            setUser({
              ...user,
              displayName: submittedName,
              photoURL: submittedPhotoURL
            });
            toast.dismiss('signup');
            toast.success('Account created successfully!', successToast);
          })
          .catch(profileError => {
            console.log(profileError);
            toast.dismiss('signup');
            toast.success('Account created, but profile details could not be updated', successToast);
          });
      } else {
        toast.dismiss('signup');
        toast.success('Account created successfully!', successToast);
      }
      
      // Reset form
      setFormData({
        name: '',
        photoURL: '',
        email: '',
        password: ''
      });
      
    }).catch((error) => {
      console.log(error);
      toast.dismiss('signup');
      
      // Show specific error messages for common Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please login instead.', errorToast);
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address. Please check and try again.', errorToast);
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak. Please choose a stronger password.', errorToast);
      } else {
        toast.error(`Registration failed: ${error.message}`, errorToast);
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <PageTitle title="Sign Up" />
      <div className="md:py-14 py-8 px-3 md:px-0 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-0 max-w-5xl w-full overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Title and Social Login */}
            <div className="bg-blue-600 text-white p-6 md:p-8 md:w-2/5 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-3">Create Your Account</h2>
                <p className="text-blue-100">
                  Join our community and discover amazing subscription boxes tailored just for you.
                </p>
              </div>
              
              <SocialAuth darkMode={true} />
              
              <div>
                <AccountToggle hasAccount={false} dark={true} />
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="p-6 md:p-8 md:w-3/5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                  icon={<FaUser className="text-gray-400" />}
                  label="Full Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rijoan Maruf"
                  required
                />

                <InputField
                  icon={<FaImage className="text-gray-400" />}
                  label="Profile Photo URL"
                  name="photoURL"
                  type="url"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://example.com/your-photo.jpg"
                />

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
                  <div className="mt-2 text-xs">
                    <p className={`flex items-center ${passwordErrors.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className={`inline-block w-4 h-4 mr-2 rounded-full ${passwordErrors.hasUpperCase ? 'bg-green-100 text-green-600' : 'bg-gray-100'} flex items-center justify-center text-xs`}>
                        {passwordErrors.hasUpperCase ? '✓' : ''}
                      </span>
                      Must have at least one uppercase letter
                    </p>
                    <p className={`flex items-center ${passwordErrors.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className={`inline-block w-4 h-4 mr-2 rounded-full ${passwordErrors.hasLowerCase ? 'bg-green-100 text-green-600' : 'bg-gray-100'} flex items-center justify-center text-xs`}>
                        {passwordErrors.hasLowerCase ? '✓' : ''}
                      </span>
                      Must have at least one lowercase letter
                    </p>
                    <p className={`flex items-center ${passwordErrors.hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className={`inline-block w-4 h-4 mr-2 rounded-full ${passwordErrors.hasMinLength ? 'bg-green-100 text-green-600' : 'bg-gray-100'} flex items-center justify-center text-xs`}>
                        {passwordErrors.hasMinLength ? '✓' : ''}
                      </span>
                      Must be at least 6 characters long
                    </p>
                  </div>
                </div>

                <div className="pt-3">
                  <PrimaryButton type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
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

export default SignUpUser; 