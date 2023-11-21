import { db } from "../firebase";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";

export async function getUserData(userID) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function getAllUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot
}

export const userUID = (JSON).parse(localStorage.getItem('user')) ? (JSON).parse(localStorage.getItem('user')).uid : false;