import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function getUserPlaylist(userID) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
        return docSnap.data()['playlist'] ? docSnap.data()['playlist'] : [];
    } else {
        console.log("No such document");
    }
}


export async function getUserExactPlaylist(userID, index) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.data()['playlist'][index];
}

export async function addUserExactPlaylist(userID, index, songID) {
    
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    let songs =  docSnap.data()['playlist'];
    songs[index]['songs'].push(songID);

    await updateDoc(docRef, {
        "playlist": songs
    }
    );
}
