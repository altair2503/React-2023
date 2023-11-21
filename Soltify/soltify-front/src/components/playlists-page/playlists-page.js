import React, {useState} from "react";
import './playlists-page.css';

import { getUserPlaylist } from "../services/playlist-service";

import { userUID } from "../services/user-service";
import { Link } from "react-router-dom";

import playlistDefault from "../../assets/playlistdefault.jpg";

let playlistList = [];

if(userUID) {
    await getUserPlaylist((JSON)
    .parse(localStorage.getItem('user')).uid)
        .then((result) => {
            playlistList = result;
        }
    );
}


const PlaylistsPage = () => {
    return <div className={"playlists_back"}>
        <span className={"playlists_title"}>Your Playlists</span>
        <div className={"playlists_description"}>Now you have • 4 Playlist</div>
        <div className={"playlists_list"}>
            <Link to={"/home/create-playlist"} className={"playlist_item create_playlist_item"}>
                <div className={"playlist_add_img"}>
                    <ion-icon name="add-outline"></ion-icon>
                </div>
                <div className={"playlist_item_info"}>
                    <span style={{opacity: 1}}>New Playlist...</span>
                </div>
            </Link>
            {
                playlistList.map((playlist, index) => {
                    return <Link to={`/home/playlists/${playlist.name}`} className={"playlist_item"}
                        state={{
                                userID: (JSON).parse(localStorage.getItem('user')).uid,
                                playlistIndex: index
                        }}>
                        { <img src={!playlist.img ? playlistDefault : playlist.img} alt={playlist.name} />}
                        <span>{playlist.name}</span>
                    </Link>
                })
            }
        </div>
    </div>

}


export default PlaylistsPage;