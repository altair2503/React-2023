Soltify - Cloud Music Platform
========

![Soltify](https://github.com/azikkw/React-2023/blob/main/Soltify/soltify_img.jpg)

### What is Soltify?
> Soltify is a cloud-based music platform that allows users to download, store songs. Also listen to your own and other songs whenever and wherever you want.
>
> Soltify is a cloud-based music platform that allows users to download, store songs. Also listen to your own and other songs whenever and wherever you want.
> With Soltify, you have the ability to manage your personal music library at your fingertips. Users can easily organize their music collection, create playlists according to their mood and preferences. Also, in addition to playlists, you will have a standard playlist - Liked. The platform interface provides a hassle-free and enjoyable journey of learning music.
>
> Soltify is not just a music platform; it is a lifestyle that improves the way you communicate with and enjoy your favorite songs. Enhance your music experience with Soltify and embark on a journey where your music is always at hand, easily fitting into the rhythm of your life.

#### To create the project, technologies such as:

    React - was used in the front side 
    Firebase - was used in the back side to retrieve, store songs and images
      
      
PROJECT MEMBERS
-------------
1. Altair Kabdrakhmanov, 21B030829
2. Azat Amen, 21B030774
3. Manarbek Yessimseit, 21B030812
      
      
PROJECT FEATURES
-------------
#### Pre-Final features:
1. Unique and adaptive(PC and Mobile versions) UI 
2. Created own API using Firebase Cloud Database (it is implemented with service song-service)
3. Real-time updating (used Firebase Realtime Database in service user-service):

       export function getUserRealTimeData(userUID, setUser) {onSnapshot(doc(db, "users", userUID), (doc) => {
           let user = ({...doc.data(),
               formattedDate: convertSecondsToDate(doc.data().date.seconds)});
               setUser(user);
           });
       }
   
4. CRUD Playlist (It is implemented in playlist-page and use servuce playlist-service)

       export async function getUserExactPlaylist(userID, index) {
           const docRef = doc(db, "users", userID);
           const docSnap = await getDoc(docRef);

           return docSnap.data()['playlist'][index];
       }

       export async function addUserExactPlaylist(userID, index, songID) {
           const docRef = doc(db, "users", userID);
           const docSnap = await getDoc(docRef);

           let songs = docSnap.data()['playlist'];
           songs[index]['songs'].push(songID);
        
           await updateDoc(docRef, {
               "playlist": songs
           });
       }

       export async function removeUserExactPlaylist(userID, index, songIndex) {
           const docRef = doc(db, "users", userID);
           const docSnap = await getDoc(docRef);
        
           let songs = docSnap.data()['playlist'];
           songs[index]['songs'].splice(songIndex, 1);
        
           await updateDoc(docRef, {
               "playlist": songs
           });
       }
   
6. Artist page (implemented in artist-page.js)

        export async function getArtistAndSongs(username){
           let artist = {};
           const artistSnapshot = await getDocs(query(collection(db, "users"), where("username", "==", username)));
               artistSnapshot.forEach((doc) => {
               artist = {id: doc.id, ...doc.data(), songs: []};
           });

           artist.songs = await getArtistSongs(artist.id);
           return artist;
        }
   
6. Search by artist name and song name (implemented in search component)

        useEffect(() => {
           if(searchQuery !== "") {
               setFoundSongs(playlist.filter(song => {
                   return song.name.toLowerCase().includes(searchQuery.toLowerCase())
                       || song.artist.username.toLowerCase().includes(searchQuery.toLowerCase())
               }))
               setFoundArtists(artists.filter(artist => {
                   return artist.username.toLowerCase().includes(searchQuery.toLowerCase())
               }))
           }
           else if(searchPageQuery !== "") {
               setFoundSongs(playlist.filter(song => {
                   return song.name.toLowerCase().includes(searchPageQuery.toLowerCase())
                       || song.artist.username.toLowerCase().includes(searchPageQuery.toLowerCase())
               }))
               setFoundArtists(artists.filter(artist => {
                   return artist.username.toLowerCase().includes(searchPageQuery.toLowerCase())
               }))
           }
        }, [searchQuery, searchPageQuery, playlist, artists]);
   
7. Add songs to playlist and “Liked”,  remove from it (implemented in playlist-music-item and use service playlist-service)

        export async function addUserExactPlaylist(userID, index, songID) {
           const docRef = doc(db, "users", userID);
           const docSnap = await getDoc(docRef);

           let songs = docSnap.data()['playlist'];
           songs[index]['songs'].push(songID);

           await updateDoc(docRef, {
               "playlist": songs
           });
        }

        export async function removeUserExactPlaylist(userID, index, songIndex) {
           const docRef = doc(db, "users", userID);
           const docSnap = await getDoc(docRef);

           let songs = docSnap.data()['playlist'];
           songs[index]['songs'].splice(songIndex, 1);

           await updateDoc(docRef, {
               "playlist": songs
           });
        }

#### New business feautres:
1. Become artist (implemented in account-page component and use serivce user-service):

        export async function becomeArtist(userID, username) {
           const docRef = doc(db, "users", userID);

           await updateDoc(docRef, {
               "username": username
           });
        }

2. Add song (implemented in account-page component and use service song-service):

        const upload = ()=> {
           if(songName === "") {
               window.alert("Select song name");
               return;
           }
           if(preview.source === null) {
               window.alert("Select preview");
               return;
           }
           if(song.source === null) {
               window.alert("Select song");
               return;
           }
           let _song = {"artistID": userUID, "duration": song.duration, "name": songName}

           setSongAddingState(true)
           uploadSong(_song).then();
       }

        const uploadSong = async(_song) => {
           let totalProgress = 0;

           const storageRef = ref(storage, 'songs/' + song.source.name);
           const uploadTask = uploadBytesResumable(storageRef, song.source);

           uploadTask.on('state_changed',
               (snapshot) => {
               totalProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 90;
               document.querySelector(".creating_progress_bar div").style.width = totalProgress + "%";
           },
           (error) => {
               console.log(error);
           },
           async () => {
               getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                   console.log('File available at', downloadURL);
                   _song = {..._song, "musicID": await addMusic(downloadURL)};
                   await uploadIMG(_song, totalProgress);
               });
           });
       }

       const uploadIMG = async(_song, totalProgress) => {
           const storageRef = ref(storage, 'images/' + preview.source.name);
           const uploadTask = uploadBytesResumable(storageRef, preview.source);

           uploadTask.on('state_changed',
           (snapshot) => {
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 10;
               totalProgress += Math.abs((totalProgress - 90) - progress)
               document.querySelector(".creating_progress_bar div").style.width = totalProgress + "%";
           },
           (error) => {
               console.log(error);
           },
           async () => {
               getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
               _song = {..._song, "img": downloadURL};
               await addSong(_song);
               })
               .then(() => {
                   setSongAddingState(false);
               })
               .finally(() => {
                   navigate("/home/account")
               });
           });
       }


3. Background animation (it is implemented in player component)
      
      
IMPORTING
---------
Step-by-step instructions for importing the `Soltify` project.

#### 1. Download ZIP and unpacking
[Download our ZIP](https://github.com/azikkw/BeJomart-GoogleSolutionChallange2023/archive/refs/heads/main.zip) archive and unpack(Unpack only the Soltify directory) it to the folder you want. You will see the following files and directories:
           
      ...
      soltify-front/               project directory
      README.md                
      soltify_img.jpg
ㅤ  
You can also import our project using the `git clone` command. To do this, you need to go to the command prompt and specify the path to the folder where you will import the project.  

Next you will need to enter the following:
      
      git clone https://github.com/azikkw/React-2023.git

#### 2. The path in the command prompt
Specify the path to the folder where you unpacked the ZIP archive in the command prompt and then go to the Soltify folder as well.
 ㅤ
#### 3. Installing libraries and modules for the front-side
Since the `soltify-front` of the project goes without the necessary libraries and modules, you will need to install them.

First you have to enter the **soltify-front folder**. After that, you need to enter the following command:

      npm install
      
As a result, your front-side directory will be replenished with the following folders:
 
      node_modules/            folder with all necessary libraries
      
      
PROJECT START
-------------
To run the project, you must enter the **soltify-front folder** and enter the following command:

      npm start
