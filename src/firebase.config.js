// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMvjSVJddxa4JKcl5VFKOjwHp45PV7_AA",
  authDomain: "house-marketplace-app-f53e9.firebaseapp.com",
  projectId: "house-marketplace-app-f53e9",
  storageBucket: "house-marketplace-app-f53e9.appspot.com",
  messagingSenderId: "36384304906",
  appId: "1:36384304906:web:8c934a131c5300465a94f3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();