import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import './playlist-page.css';
import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import { getUserExactPlaylist } from "../services/playlist-service";
import { getUserData } from "../services/user-service";


const PlaylistPage = () => {
    const location = useLocation();
    const {playlistName} = useParams();
    const [playlist, setPlaylist] = useState([]);
    const [owner, setOwner] = useState("");

    getUserExactPlaylist(location.state.userID, location.state.playlistIndex)
        .then((result) => setPlaylist(result)); 
    
    getUserData(location.state.userID)
        .then((result) => setOwner(result));

    useEffect(() => {
        console.log(playlist)
    }, [playlist, owner]);

    return (
        <div className={"playlist_background"}>
            <div className={"playlist_info"}>
                <div className={"playlist_img"}>
                    {
                        !playlist.img ? <div className={"playlist_img"}>
                            <ion-icon name="musical-notes-outline"></ion-icon>
                        </div> : <img src={playlist.img} alt={playlist.name} />
                    }
                </div>
                <div className={"playlist_details"}>
                    <span>Playlist</span>
                    <div className={"playlist_name"}>{playlistName}</div>
                    <div className={"playlist_owner"}> {owner ? `${owner.name} ${owner.lastname}` : ""} <span>•</span> {playlist.length} songs</div>
                    <button className={"play_playlist"}>Play</button>
                </div>
                {/*<div className={"playlist_options"}>*/}
                {/*    <ion-icon name="create-outline"></ion-icon>*/}
                {/*    <ion-icon name="trash-outline"></ion-icon>*/}
                {/*</div>*/}
            </div>
            <div className={"playlist_music"}>
                <div className={"titles"}>
                    <div>Song</div>
                    <div>Artist</div>
                    <div>Time</div>
                </div>
                <div className={"playlist_song_list"}>
                    {/* {
                        playlist.map((song, index) => {
                            return <PlaylistMusicItem props={song} type={true}/>
                        })
                    } */}
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage;