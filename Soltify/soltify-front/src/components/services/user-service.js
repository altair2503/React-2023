import { db } from "../../firebase";
import {collection, doc, getDoc, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {convertSecondsToDate} from "./time-converter-service";
import {getArtistSongs} from "./song-service";

export const userUID = (JSON).parse(localStorage.getItem('user')) ? (JSON).parse(localStorage.getItem('user')).uid : false;

export async function getUserData(userID) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export function getUserRealTimeData(userUID, setUser) {
    onSnapshot(doc(db, "users", userUID), (doc) => {
        let user = ({...doc.data(),
                formattedDate: convertSecondsToDate(doc.data().date.seconds)});
        setUser(user);
    });
}

export async function getArtistAndSongs(username){
    let artist = {};
    const artistSnapshot = await getDocs(query(collection(db, "users"), where("username", "==", username)));
    artistSnapshot.forEach((doc) => {
        artist = {id: doc.id, ...doc.data(), songs: []};
    });

    // const artistSongsSnapshot = await getDocs(query(collection(db, "songs"), where("artistID", "==", artist.id)))
    // artistSongsSnapshot.forEach((doc) => {
    //     artist.songs.push(doc.data());
    // })
    artist.songs = await getArtistSongs(artist.id);
    console.log(artist);

    return artist;
}


