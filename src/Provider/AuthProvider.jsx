import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase.config';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, deleteUser } from 'firebase/auth';
import toast from 'react-hot-toast';
import { successToast, errorToast } from '../utils/toastConfig';

export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    const createUser = (email , password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth , email , password);
    }

    const logInUser = (email , password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth , email, password)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const updateUserProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        }).then(() => {
            toast.success('Profile updated successfully', successToast);
        }).catch(error => {
            toast.error(`Failed to update profile: ${error.message}`, errorToast);
            throw error;
        }).finally(() => {
            setLoading(false);
        });
    }
    
    const googleAuthProvider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }

    const githubAuthProvider = new GithubAuthProvider();
    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubAuthProvider);
    }

    const deleteAccount = async () => {
        setLoading(true);
        try {
            if (!auth.currentUser) {
                toast.error('No user is currently signed in', errorToast);
                throw new Error('No user is currently signed in');
            }

            // Delete user data from localStorage
            if (user?.email) {
                // Remove user's subscriptions
                const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
                delete savedSubscriptions[user.email];
                localStorage.setItem('userSubscriptions', JSON.stringify(savedSubscriptions));

                // Remove user's wishlist
                const savedWishlist = JSON.parse(localStorage.getItem('userWishlist')) || {};
                delete savedWishlist[user.email];
                localStorage.setItem('userWishlist', JSON.stringify(savedWishlist));
            }

            // Delete the user account
            await deleteUser(auth.currentUser);
            setUser(null);
            toast.success('Account deleted successfully', successToast);
            return true;
        } catch (error) {
            console.error('Error deleting account:', error);
            toast.error(`Failed to delete account: ${error.message}`, errorToast);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            setAuthChecked(true);
        });
        
        return () => {
            unsubscribe();
        };
    }, []);

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => {
                toast.success('Logged out successfully', successToast);
            })
            .catch(error => {
                toast.error(`Error logging out: ${error.message}`, errorToast);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const authData = {
        user,
        loading,
        authChecked,
        setUser,
        createUser,
        logOut,
        logInUser,
        signInWithGoogle,
        signInWithGithub,
        updateUserProfile,
        deleteAccount,
        resetPassword,
    }
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
}

export default AuthProvider