import React, {useEffect, useState} from "react";
import './add-song-page.css';

import Input from "../utilities/input-item/input";
import { addMusic, addSong } from "../services/song-service";

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

import playlistDefault from "../../assets/playlistdefault.jpg";
import {userUID} from "../services/user-service";
import {useNavigate} from "react-router-dom";
import styles from "../utilities/input-item/input.module.css";


const AddSongPage = () => {

    const [preview, setPreview] = useState({"source": null, "img": null});
    const [song, setSong] = useState({"source": null, "file": null});
    const [songName, setSongName] = useState("");

    const [songFileState, setSongFileState] = useState(false);
    const [songAddingState, setSongAddingState] = useState(false);

    const storage = getStorage();
    const navigate = useNavigate();

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
        _song = {..._song, source: event.target.files[0]};

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        // Use the Web Audio API to get audio file duration
        const audio = new Audio(URL.createObjectURL(_song.source));

        audio.addEventListener('loadedmetadata', () => {
            reader.onload = (event) => {
                const minutes = Math.floor(audio.duration / 60);
                const seconds = Math.round(audio.duration % 60);
                setSong({ ..._song, duration: `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`, file: event.target.result});
                setTimeout(() => {
                    setSongFileState(true)
                }, 500)
            }
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
            console.log('Upload is ' + totalProgress + '% done');
        },
        (error) => {
            console.log(error);
        },
        async () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
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

    const uploadSong = async(_song) => {
        let totalProgress = 0;

        const storageRef = ref(storage, 'songs/' + song.source.name);
        const uploadTask = uploadBytesResumable(storageRef, song.source);

        uploadTask.on('state_changed',
        (snapshot) => {
            totalProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 90;
            document.querySelector(".creating_progress_bar div").style.width = totalProgress + "%";
            console.log('Upload is ' + totalProgress + '% done');
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

    useEffect(() => {
        console.log(preview);
        console.log(song);
    }, [preview.img, preview.source, song]);


    return <div className={"song_add_container"}>
        {
            songAddingState
            ?
                <div className={"creating_progress"}>
                    <div className={"progress_popup"} style={{background: 'rgba(42, 42, 42, .95)'}}>
                        <span>Song is uploading ...</span>
                        <div className={"creating_progress_bar"}>
                            <div></div>
                        </div>
                    </div>
                </div>
            :
                ''
        }
        <div className={"song_add_background"}>
            <div className={"add_area"}>
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
                    <p><ion-icon name="musical-notes-outline"></ion-icon> Song Information Section:</p>
                    <div className={"song_choose"}>
                        <input type="file" id={"file_for_song"} onChange={selectSong} />
                        <label htmlFor="file_for_song">
                            { song?.file ? "Select another song file" : "Select song file" }
                            <ion-icon name="musical-notes-outline"></ion-icon>
                        </label>
                        {
                            song.file
                            ?
                                <audio className={!songFileState ? "audio_file" : "audio_file active"} controls>
                                    <source src={song.file} type="audio/ogg" />
                                </audio>
                            :
                                ""
                        }
                    </div>
                    <div className={"input_block"}>
                        <label>Song name</label>
                        <input name="lastname" type={"text"} placeholder={"Enter song name"} onChange={(e) => {setSongName(e.target.value)}} />
                    </div>
                    <button onClick={upload}>Add Song</button>
                </div>
            </div>
        </div>
    </div>

}

export default AddSongPage;