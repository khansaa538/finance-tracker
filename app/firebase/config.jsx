import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDvNsWdqvpk-HzDgHq6HiaZFxJT1AnP45c",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "proyek-transaksi.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "proyek-transaksi",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "proyek-transaksi.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "9356065687",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:9356065687:web:71c38e3ea5eb1ca23b22d2",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-EMV7P1HHQW",
};

console.log("Firebase Config:", {
  apiKey: firebaseConfig.apiKey ? "✅ Set" : "❌ Missing",
  authDomain: firebaseConfig.authDomain ? "✅ Set" : "❌ Missing",
  projectId: firebaseConfig.projectId ? "✅ Set" : "❌ Missing",
  storageBucket: firebaseConfig.storageBucket ? "✅ Set" : "❌ Missing",
  messagingSenderId: firebaseConfig.messagingSenderId ? "✅ Set" : "❌ Missing",
  appId: firebaseConfig.appId ? "✅ Set" : "❌ Missing",
  measurementId: firebaseConfig.measurementId ? "✅ Set" : "❌ Missing",
});

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
