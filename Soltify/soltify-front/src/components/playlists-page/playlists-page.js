import React, {useState} from "react";
import './playlists-page.css';

import {Link, useOutletContext} from "react-router-dom";

import playlistDefault from "../../assets/playlistdefault.jpg";



const PlaylistsPage = () => {
    const {user} = useOutletContext();

    return <div className={"playlists_back"}>
        <span className={"playlists_title"}>Your Playlists</span>
        <div className={"playlists_description"}>Now you have • {user.playlist.length} Playlist</div>
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
                user.playlist.map((playlist, index) => {
                    return <Link
                        to={`/home/playlists/${index}`}
                        className={"playlist_item"}
                        state={{
                            userID: (JSON).parse(localStorage.getItem('user')).uid,
                            playlistIndex: index
                        }}
                    >
                        { <img src={!playlist.img ? playlistDefault : playlist.img} alt={playlist.name} /> }
                        <div className={"playlist_item_info"}>
                            <span>{playlist.name}</span>
                            <span>{playlist.songs.length} songs</span>
                        </div>
                        <ion-icon name="chevron-forward-outline" id={"playlist_item_open_btn"}></ion-icon>
                    </Link>
                })
            }
        </div>
    </div>

}


export default PlaylistsPage;