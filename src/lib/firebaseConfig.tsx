// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8dvfzew9E6zmRKOD6jgxS-zKnFLsdpXY",
  authDomain: "daily-7345f.firebaseapp.com",
  projectId: "daily-7345f",
  storageBucket: "daily-7345f.firebasestorage.app",
  messagingSenderId: "298851233366",
  appId: "1:298851233366:web:147721781baf3c1f6795f7",
  measurementId: "G-ZCR6G2PF69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);

const db  = getFirestore(app);

export { auth, app , firebaseConfig, db };