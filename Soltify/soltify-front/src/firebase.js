import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkkhYsSGx95X5aMm5pjc6uwFZ82zyVh9Y",
    authDomain: "soltify-last-database.firebaseapp.com",
    projectId: "soltify-last-database",
    storageBucket: "soltify-last-database.appspot.com",
    messagingSenderId: "64702492239",
    appId: "1:64702492239:web:5fae77574b4c02ae9a443a",
    measurementId: "G-N7TC8CJGXL"
};

  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);