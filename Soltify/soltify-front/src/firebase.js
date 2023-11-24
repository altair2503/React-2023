import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgjAlQkt5k6rcxZv5QVQseqNd76vCYv6Q",
    authDomain: "soltify-4.firebaseapp.com",
    projectId: "soltify-4",
    storageBucket: "soltify-4.appspot.com",
    messagingSenderId: "786991175206",
    appId: "1:786991175206:web:63baa3281687bc2c6338e7"
};
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);