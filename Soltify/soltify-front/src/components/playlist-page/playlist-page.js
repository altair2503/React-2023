import React, {useEffect, useState} from "react";
import {useParams, useLocation, useOutletContext, Link, useNavigate} from "react-router-dom";
import './playlist-page.css';


import { getPlaylistSongs } from "../services/song-service";
import { getUserExactPlaylist } from "../services/playlist-service";
import {getUserData, userUID} from "../services/user-service";

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";

import { db } from "../../firebase";
import {arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";

import playlistDefault from '../../assets/playlistdefault.jpg';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";



const PlaylistPage = () => {
    const [songs, setSongs] = useState([]);
    const {index} = useParams();
    const [ind, setInd] = useState("");
    const {user} = useOutletContext();
    const [playlistIMG, setPlaylistIMG] = useState("");
    const [imgSource, setImgSource] = useState(user?.playlist[index]?.img);
    const storage = getStorage()
    const [updatePlaylist, setUpdatedPlaylist] = useState({...user?.playlist[index]});
    const navigate = useNavigate();
    const [deletePopupState, setDeletePopupState] = useState(false);
    const [updatePopupState, setUpdatePopupState] = useState(false);


    const selectIMG = (event)=> {
        setImgSource(event.target.files[0]);

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (event) => {
            setPlaylistIMG(event.target.result);
            setUpdatedPlaylist({...updatePlaylist, img: event.target.result})
        }

    }

    const uploadIMG = async() => {
        const storageRef = ref(storage, 'images/' + imgSource.name);
        const uploadTask = uploadBytesResumable(storageRef, imgSource);

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
                    changeUserFirestore(downloadURL);
                });
            });
    }

    const changePlaylist = async() => {
        if(imgSource !== user.playlist[index].img){
            await uploadIMG();
            return;
        }
        await changeUserFirestore(user.playlist[index].img);
    }

    const changeUserFirestore = async(url) => {
        const userRef = doc(db, "users", (JSON).parse(localStorage.getItem('user')).uid);
        let upl = user.playlist;
        upl[index] = {...updatePlaylist};

        await updateDoc(userRef, {
            "playlist": upl
        }).then(() => {
            setUpdatePopupState(false);
            setUpdatedPlaylist({...updatePlaylist});
        });
    };

    const deletePlaylist = async() =>{
        const userRef = doc(db, "users", (JSON).parse(localStorage.getItem('user')).uid);
        let upl = user.playlist;
        upl.splice(index, 1)

        await updateDoc(userRef, {
            "playlist": upl
        }).then(() => {
            navigate('/home');
            setDeletePopupState(false);
        });
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const songsResult = await getPlaylistSongs(user?.playlist[index].songs);
                setSongs(songsResult);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const songsResult = await getPlaylistSongs(user?.playlist[index].songs);
                setSongs(songsResult);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        setInd(index);
        fetchData();
    }, [index, user.playlist]);


    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "delete_popup_back") {
                setDeletePopupState(false); setUpdatePopupState(false);
            }
        })
    })

    
    return <div className={"playlist_background"}>
        {
            deletePopupState
            ?
                <div className={"delete_popup_back"}>
                    <div className={"delete_popup"}>
                        <ion-icon name="close-outline" onClick={() => setDeletePopupState(false)}></ion-icon>
                        <span>Are you sure you want to delete this playlist?</span>
                        <div className={"decision_btns"}>
                            <button onClick={deletePlaylist}>Yes</button>
                            <button onClick={() => setDeletePopupState(false)}>No</button>
                        </div>
                    </div>
                </div>
            :
                ''
        }
        {
            updatePopupState
            ?
                <div className={"delete_popup_back"}>
                    <div className={"delete_popup update"}>
                        <ion-icon name="close-outline" onClick={() => setUpdatePopupState(false)}></ion-icon>
                        <span>Update Playlist</span>
                        <div className={"playlist_ft_imf update"}>
                            <input type="file" id={"img_for_playlist"} onChange={selectIMG}/>
                            <img src={updatePlaylist?.img === "" ? playlistDefault : updatePlaylist?.img} alt={user.playlist[ind]?.name} />
                            <label htmlFor="img_for_playlist"></label>
                        </div>
                        <div className={"input_block"}>
                            <input name="lastname" type="text" placeholder={"Enter playlist name"} value={updatePlaylist?.name} onChange={e => setUpdatedPlaylist({...updatePlaylist, "name": e.target.value})} />
                        </div>
                        <div className={"decision_btns"}>
                            <button onClick={changePlaylist}>Change</button>
                        </div>
                    </div>
                </div>
            :
                ''
        }
        <div className={"playlist_info_back"}>
            <img src={!user?.playlist[ind]?.img ? playlistDefault : user?.playlist[ind]?.img} className={"playlist_info_back_img"} alt={playlistDefault} />
            <div className={"playlist_info"}>
                <div className={"playlist_img"}>
                    <img src={!user.playlist[ind]?.img ? playlistDefault : user.playlist[ind]?.img} alt={user.playlist[ind]?.name} />
                </div>
                <div className={"playlist_details"}>
                    <span>Playlist</span>
                    <div className={"playlist_name"}>{user.playlist[ind]?.name}</div>
                    <div className={"playlist_owner"}> {user ? `${user?.name} ${user?.lastname}` : ""} <span>•</span> {user?.playlist[ind]?.songs.length} songs</div>
                    <div className={"playlist_options"}>
                        <button className={"play_playlist"}>Play</button>
                            {
                                index !== "0"
                                ?
                                    <div className={"update_option"} onClick={() => setUpdatePopupState(true)}>
                                        <ion-icon name="create-outline"></ion-icon>
                                    </div>
                                :
                                    ''
                            }
                            {
                                index !== "0"
                                ?
                                    <div className={"delete_option"} onClick={() => setDeletePopupState(true)}>
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </div>
                                :
                                    ''
                            }
                    </div>
                </div>
            </div>
            <div className={"playlist_music"}>
                <div className={"titles"}>
                    <div>#</div>
                    <div>Song</div>
                    <div>Artist</div>
                    <div>Time</div>
                </div>
                {
                    songs?.length > 0
                    ?
                        <div className={"playlist_song_list"}>
                            {
                                songs?.map((song, index) => {
                                    return <PlaylistMusicItem props={song} index={index + 1} artist={false} type={true} playlist={songs} user={user} plIndex={index}/>
                                })
                            }
                        </div>
                    :
                        <div className={"playlist_song_list"}>
                            <div className={"if_zero"}>
                                <span>There are no songs in this playlist yet. <br/> Do you want to add them?</span>
                                <Link to={"/home/search"}>Add songs</Link>
                            </div>
                        </div>
                }
            </div>
        </div>
    </div>

}

export default PlaylistPage;