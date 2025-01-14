import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXb9wI2MKtoBkzqSaGJUDnbC35rVXWj6I",
  authDomain: "myresume-6786d.firebaseapp.com",
  projectId: "myresume-6786d",
  storageBucket: "myresume-6786d.firebasestorage.app",
  messagingSenderId: "208239348444",
  appId: "1:208239348444:web:7c8aeb4253cd436c68c219",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
