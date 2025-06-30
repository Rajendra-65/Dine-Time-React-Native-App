
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRnkYRpjXp8tVG3RUB94V1YE6CWooNYQE",
  authDomain: "dine-time-d75ca.firebaseapp.com",
  projectId: "dine-time-d75ca",
  storageBucket: "dine-time-d75ca.firebasestorage.app",
  messagingSenderId: "714879979162",
  appId: "1:714879979162:web:8f7b26bb967393f3459923",
  measurementId: "G-XFB84WPGD3"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Proper Auth Initialization with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };

