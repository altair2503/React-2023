import React, {useEffect, useState} from "react";
import './add-song-page.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {userUID} from "../services/user-service";
import {addMusic, addSong} from "../services/song-service";


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
            setSong({ ..._song, duration: `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}` });
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
                    await addSong(_song);
                    window.alert("Song added");
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
        if(songName === ""){
            window.alert("Select song name");
            return;
        }
        if(preview.source === null){
            window.alert("Select preview");
            return;
        }
        if(song.source === null){
            window.alert("Select song");
            return;
        }
        let _song = {"artistID": userUID, "duration": song.duration, "name": songName}
        uploadSong(_song);
    }

    useEffect(() => {
        console.log(preview);
        console.log(song);
    }, [preview.img, preview.source, song]);


    return <div>
        <div>
            {
                preview.img ?
                    (
                        <div>
                            <img src={preview.img} alt={"preview"} />
                        </div>
                    )
                    :
                    "no preview"
            }
        </div>

        <div>
            {
                song.file ?
                    (
                        <audio controls>
                            <source src={song.file} type="audio/ogg" />
                        </audio>
                    )
                    :
                    "no preview"
            }
        </div>
        <div>
            <label style={{color: "white"}}>Select song name</label>
            <input type="text" onChange={(e) => {setSongName(e.target.value)}}/>
        </div>
        <div>
            <label style={{color: "white"}}>Select preview</label>
            <input type="file" onChange={selectIMG} />
        </div>
        <div>
            <label style={{color: "white"}}>Select song</label>
            <input type="file" onChange={selectSong}/>
        </div>
        <button onClick={upload}>Upload</button>
    </div>

}

export default AddSongPage;