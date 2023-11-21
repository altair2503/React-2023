import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrhx7Pm_uzi1_oqB3dp4d_fmHh543gjhM",
    authDomain: "soltify-2.firebaseapp.com",
    projectId: "soltify-2",
    storageBucket: "soltify-2.appspot.com",
    messagingSenderId: "663047973954",
    appId: "1:663047973954:web:b0328effee5b4003ae11db"
};
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);