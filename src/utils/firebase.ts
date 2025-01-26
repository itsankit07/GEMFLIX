// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { browserSessionPersistence, setPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk6XD5gmObkadd4n_txe_N-gMbxsHg640",
  authDomain: "netflix-gpt-b0bad.firebaseapp.com",
  projectId: "netflix-gpt-b0bad",
  storageBucket: "netflix-gpt-b0bad.firebasestorage.app",
  messagingSenderId: "435031972355",
  appId: "1:435031972355:web:91f9d10fb78dbfb3310c36",
  measurementId: "G-RLLL9EDTPC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();

// Set persistence to session-based (optional)
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Proceed with login
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });
