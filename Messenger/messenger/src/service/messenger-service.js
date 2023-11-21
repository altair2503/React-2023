import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import {db} from "../firebase";
import {userUID} from "./user-service";

export async function getChats() {
    let chats = []

    const ref = collection(db, "chats")
    const q = query(ref, where("userIds", "array-contains", userUID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        chats.push({id: doc.id, ...doc.data()})
    })
}

export async function getChatMessages(chatId) {
    const ref = collection(db, "chats", chatId, "messages")
    const q = query(ref, orderBy("sentDate", "asc"))
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}