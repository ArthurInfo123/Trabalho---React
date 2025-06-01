// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcAsO8dpE89cyGlE-1UBRbJ7tgWgeAgSA",
  authDomain: "react-a7ac8.firebaseapp.com",
  projectId: "react-a7ac8",
  storageBucket: "react-a7ac8.firebasestorage.app",
  messagingSenderId: "719248084127",
  appId: "1:719248084127:web:81ef9c565dcca9dbfaa6aa",
  measurementId: "G-M17B757PDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 

