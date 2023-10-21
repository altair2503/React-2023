// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
<<<<<<< HEAD

=======
import {collection, addDoc} from "firebase/firestore";
>>>>>>> refs/remotes/origin/main
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIekCQPVZg0bWZfYoJ9lD0ZfOGhbbOIcc",
    authDomain: "soltify-auth.firebaseapp.com",
    projectId: "soltify-auth",
    storageBucket: "soltify-auth.appspot.com",
    messagingSenderId: "351369038084",
    appId: "1:351369038084:web:1025ccdb9928ca5713e851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
<<<<<<< HEAD

export const auth = getAuth(app);
export const db = getFirestore(app)
=======
export const auth = getAuth(app);
export const db = getFirestore(app);
>>>>>>> refs/remotes/origin/main
