import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhxNHsx--Tg4K_lAEILY8RiAgMYXRE6BA",
    authDomain: "messenger-27327.firebaseapp.com",
    projectId: "messenger-27327",
    storageBucket: "messenger-27327.appspot.com",
    messagingSenderId: "452041681665",
    appId: "1:452041681665:web:8a5d7facb924f916370900"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);