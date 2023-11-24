import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhPXbzSMIqK_Zbwo7fK0fOKrYiLeq30i4",
    authDomain: "soltify-c7f8e.firebaseapp.com",
    projectId: "soltify-c7f8e",
    storageBucket: "soltify-c7f8e.appspot.com",
    messagingSenderId: "249320840104",
    appId: "1:249320840104:web:668f0274a40d20e5eadb9d",
    measurementId: "G-HC71DLF9Q0"
};
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);