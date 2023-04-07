import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnhHDgI4CGoLxnOyi8mBWJJ9ej--n_aMU",
  authDomain: "myapp-66fe8.firebaseapp.com",
  projectId: "myapp-66fe8",
  storageBucket: "myapp-66fe8.appspot.com",
  messagingSenderId: "180520164740",
  appId: "1:180520164740:web:e1ea731e2b7638198491d1",
  measurementId: "G-N31HHF1E6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();