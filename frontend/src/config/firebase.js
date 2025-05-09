// Dummy Firebase config for nimport { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbyEEAarP0iUPdOILxAvtmcx3uXGSL8iI",
  authDomain: "job-portal-a0654.firebaseapp.com",
  projectId: "job-portal-a0654",
  storageBucket: "job-portal-a0654.firebasestorage.app",
  messagingSenderId: "428143762840",
  appId: "1:428143762840:web:45c7497913cee0b2f45fed",
  measurementId: "G-6QV5WEL4E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});