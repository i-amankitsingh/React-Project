// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";




// Your Firebase config object from the Firebase Console
const firebaseConfig = {
    apiKey: String(import.meta.env.VITE_API_KEY),
    authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
    messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
    appId: String(import.meta.env.VITE_APP_ID)
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
const signInWithGoogle = async () => {
    try{
       const res = await signInWithPopup(auth, googleProvider);
       const user = res.user;
       return [true, user];
       
    }
    catch(err){
      return [false, err];
    }
};

// Function to handle Email/Password Sign-Up
const signUpWithEmail = async(name, email, password) => {
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName : name,
      })
      // throw userCredential
      return [true, user];
    }
    catch(err){
      return [false, err]
    }
};

// Function to handle Email/Password Sign-In
const signInWithEmail = async (email, password) => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return [true, user];
    }
    catch(err){
      return [false, err];
    }
};

// Function to handle Sign-Out
const signOutUser = () => {
  signOut(auth)
    .then(() => {
      sessionStorage.setItem('userInfo', null)
      console.log('User signed out');

    })
    .catch((error) => {
      console.error('Error during sign-out:', error);
    });

};

export {
  auth,
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  onAuthStateChanged,
};
