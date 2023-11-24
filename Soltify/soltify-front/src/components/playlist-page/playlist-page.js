import React, { useEffect, useState } from "react";
import './playlist-page.css';

import { useParams, useLocation, Link } from "react-router-dom";

import { getPlaylistSongs } from "../services/song-service";
import { getUserExactPlaylist } from "../services/playlist-service";
import {getUserData, userUID} from "../services/user-service";

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";

import { db } from "../../firebase";
import {arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";

import playlistDefault from '../../assets/playlistdefault.jpg';


const PlaylistPage = () => {

    const {playlistName} = useParams();
    const [playlist, setPlaylist1] = useState({songs: []});

    const [songs, setSongs] = useState([]);
    const [owner, setOwner] = useState("");

    const [deletePopupState, setDeletePopupState] = useState(false);
    const [updatePopupState, setUpdatePopupState] = useState(false);

    const [newPlaylistName, setNewPlaylistName] = useState(playlistName)

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playlistResult = await getUserExactPlaylist(location.state?.userID, location.state?.playlistIndex);
                setPlaylist1(playlistResult);

                const songsResult = await getPlaylistSongs(playlistResult?.songs);
            } catch(error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().then()
    }, [location.state?.userID, location.state?.playlistIndex])

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const ownerResult = await getUserData(location.state?.userID);
                setOwner(ownerResult);
            } catch(error) {
                console.error("Error fetching owner data:", error);
            }
        };
        fetchOwnerData().then()
    }, [location.state?.userID])

    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "delete_popup_back") {
                setDeletePopupState(false); setUpdatePopupState(false);
            }
        })
    })

    const updatePlaylistData = () => {
        const ref = doc(db, "users", userUID)
        const snap = getDoc(ref)

        updateDoc(ref, {
            playlist: arrayUnion({
                img: playlist?.img,
                name: newPlaylistName
            })
        }).then(() => {
            setUpdatePopupState(false)
        })
    }
    
    return <div className={"playlist_background"}>
        {
            deletePopupState
            ?
                <div className={"delete_popup_back"}>
                    <div className={"delete_popup"}>
                        <ion-icon name="close-outline" onClick={() => setDeletePopupState(false)}></ion-icon>
                        <span>Are you sure you want to delete this playlist?</span>
                        <div className={"decision_btns"}>
                            <button>Yes</button>
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
                    <form onSubmit={updatePlaylistData} className={"delete_popup update"}>
                        <ion-icon name="close-outline" onClick={() => setUpdatePopupState(false)}></ion-icon>
                        <span>Update Playlist</span>
                        <div className={"playlist_ft_imf update"}>
                            <input type="file" id={"img_for_playlist"}/>
                            <img src={!playlist.img ? playlistDefault : playlist?.img} alt={playlist?.name} />
                            <label htmlFor="img_for_playlist"></label>
                        </div>
                        <div className={"input_block"}>
                            <input name="lastname" value={newPlaylistName} type="text" placeholder={"Enter new playlist name"} onChange={e => setNewPlaylistName(e.target.value)} />
                        </div>
                        <div className={"decision_btns"}>
                            <button type="submit">Change</button>
                        </div>
                    </form>
                </div>
            :
                ''
        }
        <div className={"playlist_info_back"}>
            <img src={!playlist?.img ? playlistDefault : playlist?.img} className={"playlist_info_back_img"} alt={playlistDefault} />
            <div className={"playlist_info"}>
                <div className={"playlist_img"}>
                    <img src={!playlist?.img ? playlistDefault : playlist?.img} alt={playlist?.name} />
                </div>
                <div className={"playlist_details"}>
                    <span>Playlist</span>
                    <div className={"playlist_name"}>{playlistName}</div>
                    <div className={"playlist_owner"}> {owner ? `${owner?.name} ${owner?.lastname}` : ""} <span>•</span> {playlist?.songs?.length} songs</div>
                        <div className={"playlist_options"}>
                            <button className={"play_playlist"}>Play</button>
                            {
                                location.state?.playlistIndex !== 0
                                ?
                                    <div className={"update_option"} onClick={() => setUpdatePopupState(true)}>
                                        <ion-icon name="create-outline"></ion-icon>
                                    </div>
                                :
                                    ''
                            }
                            {
                                location.state?.playlistIndex !== 0
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
                    songs.length > 0
                    ?
                        <div className={"playlist_song_list"}>
                            {
                                songs.map((song, index) => {
                                    return <PlaylistMusicItem props={song} index={index + 1} artist={false} type={true} playlist={songs} />
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