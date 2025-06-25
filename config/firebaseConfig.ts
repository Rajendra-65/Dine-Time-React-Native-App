// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRnkYRpjXp8tVG3RUB94V1YE6CWooNYQE",
  authDomain: "dine-time-d75ca.firebaseapp.com",
  projectId: "dine-time-d75ca",
  storageBucket: "dine-time-d75ca.firebasestorage.app",
  messagingSenderId: "714879979162",
  appId: "1:714879979162:web:8f7b26bb967393f3459923",
  measurementId: "G-XFB84WPGD3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)