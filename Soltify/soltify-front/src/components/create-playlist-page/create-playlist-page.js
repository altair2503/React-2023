import React, { useState } from "react";
import './create-playlist-page.css';
import userImg from "../../assets/music.jpg";
import Input from "../utilities/input/input";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";

const CreatePlaylistPage = () => {
    const [playlistIMG, setPlaylistIMG] = useState("");
    const [playlistSource, setPlaylistSource] = useState("");
    const [playlistTitle, setplaylistTitle] = useState("");
    const storage = getStorage();
  

    const selectIMG = (event)=> {
        setPlaylistSource(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          setPlaylistIMG(event.target.result);
        }
    }

    const uploadIMG = async() => {
        const storageRef = ref(storage, 'images/' + playlistSource.name);
        const uploadTask = uploadBytesResumable(storageRef, playlistSource);

        uploadTask.on('state_changed',
            (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            console.log(error);
        }, 
        async () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                uploadPlaylist(downloadURL);
            });
        }
        );
    }

    

    const createPlaylist = async() => {
        if(playlistSource){
            await uploadIMG();
            return;
        }
        uploadPlaylist("");
    }

    const uploadPlaylist = async(imgURL)=> {
        const userRef = doc(db, "users", (JSON).parse(localStorage.getItem('user')).uid);

        await updateDoc(userRef, {
            playlist: arrayUnion({
                "name": playlistTitle,
                "img": imgURL,
                "songs": []
            })
        })
            .then(() => {
                console.log("successfuly added");
            });
    };


    return <div>
        <span className={"acc_title"}>Create Playlist</span>
        <div className={"create_area"}>
            <div className={"playlist_ft_imf"}>
                {playlistIMG ? <img src={playlistIMG} /> : <ion-icon name="musical-notes-outline"></ion-icon>  } 
            </div>
            <input type="file" onChange={selectIMG} />
            <div className={"playlist_data"}>
                <div>Fill the fields</div>
                <Input props={{name: 'Playlist name'}} onChange={(e) => {setplaylistTitle(e.target.value)}}/>
                <button onClick={createPlaylist}>Create</button>
            </div>
        </div>
    </div>
}

export default CreatePlaylistPage;