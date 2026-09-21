import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfigJson from "../../firebase-applet-config.json";

// User's configured project settings with fallback to auto-provisioned config
export const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey || "AIzaSyDbyYBr4-5jagmrD0s2Ju9hebvwVrbZkIY",
  authDomain: firebaseConfigJson.authDomain || "ecomarch.firebaseapp.com",
  projectId: firebaseConfigJson.projectId || "ecomarch",
  storageBucket: firebaseConfigJson.storageBucket || "ecomarch.firebasestorage.app",
  messagingSenderId: firebaseConfigJson.messagingSenderId || "74621767431",
  appId: firebaseConfigJson.appId || "1:74621767431:web:37e4bfe9ff4af41b69bfa2",
  measurementId: firebaseConfigJson.measurementId || "G-B86VKFY1LX",
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = firebaseConfigJson.firestoreDatabaseId
  ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
