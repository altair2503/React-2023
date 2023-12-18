import React, { useState } from "react";
import './add-song-page.css';

import Input from "../utilities/input-item/input";
// import { addMusic, addSong } from "../services/song-service";

import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";

import playlistDefault from "../../assets/playlistdefault.jpg";


const AddSongPage = () => {

    const [preview, setPreview] = useState({"source": null, "img": null});
    const [song, setSong] = useState({"source": null});
    const [songName, setSongName] = useState("");

    const storage = getStorage();

    const selectIMG = (event)=> {
        let img = {};
        img = {...img, source: event.target.files[0]};

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (event) => {
            console.log(event.target)
            img = ({...img, img: event.target.result});
            setPreview(img);
        }
    }

    const selectSong = async (event) => {
        let _song = {};
        _song = {...song, source: event.target.files[0]};

        // Use the Web Audio API to get audio file duration
        const audio = new Audio(URL.createObjectURL(_song.source));

        audio.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.round(audio.duration % 60);
            // setSong({ ..._song, duration: `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}` });
        });
    }

    const uploadIMG = async(_song, totalProgress) => {
        const storageRef = ref(storage, 'images/' + preview.source.name);
        const uploadTask = uploadBytesResumable(storageRef, preview.source);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 10;
                totalProgress += Math.abs((totalProgress - 90) - progress)
                console.log('Upload is ' + totalProgress + '% done');
            },
            (error) => {
                console.log(error);
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    _song = {..._song, "img": downloadURL};
                    // await addSong(_song);
                    window.alert("Song added");
                });
            });
    }


    return <div className={"song_add_container"}>
        <div className={"song_add_background"}>
            <div className={"title_cont"}>
                <div className={"title"}>Add Song</div>
                <div className={"subtitle"}>Add your favorite song to Soltify</div>
            </div>
            <div className={"song_container"}>
                <div className={"song_cover"}>
                    <input type="file" id={"cover_for_song"} onChange={selectIMG} />
                    <img src={ preview.img ? preview.img : playlistDefault} alt={playlistDefault} />
                    <label htmlFor="cover_for_song"></label>
                </div>
                <div className={"song_choose"}>
                    <input type="file" onChange={selectSong} />
                    {
                        song.file
                        ?
                            <audio controls>
                                <source src={song.file} type="audio/ogg" />
                            </audio>
                        :
                            ""
                    }
                </div>
                <Input props={{name: 'Song name', type: 'text'}} value={""} />
                <button>Add Song</button>
            </div>
        </div>
    </div>

}

export default AddSongPage;