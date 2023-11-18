import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserData(userID){
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}



export const userUID = (JSON).parse(localStorage.getItem('user')) ? (JSON).parse(localStorage.getItem('user')).uid : false;