import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9ODAN9K9opIvFPxhDLT-tCkzNZuXVUzM",
    authDomain: "todo-f9c62.firebaseapp.com",
    projectId: "todo-f9c62",
    storageBucket: "todo-f9c62.appspot.com",
    messagingSenderId: "60916210624",
    appId: "1:60916210624:web:edb1ee0b90322d03bf0625",
    measurementId: "G-1FPH55MNMB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();