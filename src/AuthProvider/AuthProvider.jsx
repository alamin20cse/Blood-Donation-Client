// import React, { useEffect, useState, createContext } from 'react';
import { createContext, useEffect, useState } from "react";

import {
    createUserWithEmailAndPassword, // Corrected function name
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile as firebaseUpdateProfile, // Aliased to avoid conflicts
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import Loading from "../Layout/Shared/Loading";
import axios from "axios";

export const AuthContext=createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createNewUser = async (email, password) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error creating new user:", error);
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setLoading(false);
        }
    };

    const userLogin = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (updatedData) => {
        const { displayName, photoURL } = updatedData;
        try {
            await firebaseUpdateProfile(auth.currentUser, { displayName, photoURL });
            setUser((prevUser) => ({
                ...prevUser,
                displayName,
                photoURL,
            }));
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = async () => {
        try {
            return await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const authInfo = {
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin,
        loading,
        setLoading,
        updateUserProfile, // Updated reference
        handleGoogleSignIn,
    };

   
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser?.email) {
                setUser(currentUser);
    
                try {
                    const { data } = await axios.post(`http://localhost:5000/jwt`, {
                        email: currentUser.email,
                    },{
                        withCredentials: true
                    });
                    console.log(data); // Handle token or other responses
                    // localStorage.setItem("authToken", data.token); // Save token if needed

                    
                } catch (error) {
                    console.error("Error generating JWT:", error.message);
                }
            } else {
                setUser(null); // Clear user if no user is signed in


                const { data } = await axios.get(`http://localhost:5000/logout`,{
                    withCredentials: true
                });
            }
    
            setLoading(false); // Set loading to false after processing
        });
    
        return () => {
            unsubscribe(); // Cleanup subscription
        };
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {loading ? <div><Loading></Loading></div> : children}
        </AuthContext.Provider>
    );
    
};

export default AuthProvider;
