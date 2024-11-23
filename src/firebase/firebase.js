// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5qHHvisMHH_82niYpfjQ7pruNC_i85Cw",
  authDomain: "ritz-9db26.firebaseapp.com",
  databaseURL: "https://ritz-9db26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ritz-9db26",
  storageBucket: "ritz-9db26.appspot.com",
  messagingSenderId: "185694606959",
  appId: "1:185694606959:web:bf8984744d23b97c765f9a",
  measurementId: "G-F2CRQZSQXY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
