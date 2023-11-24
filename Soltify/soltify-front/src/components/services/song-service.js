import { db } from "../../firebase";
import {doc, getDoc, getDocs, collection, onSnapshot, query, where} from "firebase/firestore";

const getArtist = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists) {
    return docSnap.data();
  } else {
    console.log("No such document");
    return null;
  }
};

export async function getSongs() {
  const dbInstance = collection(db, 'songs');
  const songsData = await getDocs(dbInstance);
  
  return Promise.all(songsData.docs.map(async (item) => {                
    const artistData = await getArtist(item.data()['artistID']);
    return { ...item.data(), id: item.id, artist: artistData };
  }));
}

export async function getArtistSongs(artistID) {
  const dbInstance = collection(db, 'songs');
  // const songsData = await getDocs(dbInstance);
  const artistSongsSnapshot = await getDocs(query(collection(db, "songs"), where("artistID", "==", artistID)))


  return Promise.all(artistSongsSnapshot.docs.map(async (item) => {
    const artistData = await getArtist(item.data()['artistID']);
    return { ...item.data(), id: item.id, artist: artistData };
  }));
}

export async function getPlaylistSongs(playlist) {
  const dbInstance = collection(db, 'songs');
  const songsData = await getDocs(dbInstance);
  const filteredSongs = songsData.docs.filter(item => playlist.includes(item.id));
  
  return Promise.all(filteredSongs.map(async (item) => {                
    const artistData = await getArtist(item.data()['artistID']);
    return { ...item.data(), id: item.id, artist: artistData };
  }));
}

export async function getMusic(id) {
    const docRef = doc(db, "music", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      return docSnap.data();
    } else {
      console.log("No such document");
      return null;
    }
  }
  