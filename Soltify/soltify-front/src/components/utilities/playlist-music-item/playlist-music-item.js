import React, {useEffect, useState} from "react";
import './playlist-music-item.css';
import {Link} from "react-router-dom";
import { addUserExactPlaylist, getUserPlaylist } from "../../services/playlist-service";
import { userUID } from "../../services/user-service";

var userPlaylist = []
await getUserPlaylist(userUID)
    .then((succes) => {
        userPlaylist = succes;
    })

const PlaylistMusicItem = ({props, type, playlist}) => {
    const [playlistAddState, setPlaylistAddState] = useState(false);
    const [songOptionListState, setSongOptionListState] = useState(false);

    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "back_to_options") {
                setPlaylistAddState(false)
            }
            if(e.target.className !== "add_to_playlist_btn for_options" && e.target.id !== "open_song_options_btn" && e.target.className !== "back_to_options") {
                setSongOptionListState(false)
                setPlaylistAddState(false)
            }
        })
    }, [])


    if(type) {
        return (
            <div className={"song_back"}>
                <div className={"song_left"}>
                    <img src={props.img} alt={props.img} />
                    {props.name}
                </div>
                <Link to={"/home/artist"} className={"song_artist"}>{props.artist.username}</Link>
                <div className={"song_time"}>{props.duration}</div>
                <div className={"song_options"}>
                    <ion-icon name="ellipsis-horizontal" id={"open_song_options_btn"} onClick={() => setSongOptionListState(songOptionListState => !songOptionListState)}></ion-icon>
                    {
                        songOptionListState ? <ul className={"options_list"}>
                            <li><ion-icon name="heart"></ion-icon> Add to Like</li>
                            <li className={"add_to_playlist_btn for_options"} onClick={() => setPlaylistAddState(playlistAddState => !playlistAddState)}>
                                <ion-icon name="add-outline" id={"add_to_playlist_btn"}></ion-icon> Add to playlist
                                {
                                    playlistAddState ? <div className="list_to_add">
                                        <span className={"back_to_options"} onClick={() => setPlaylistAddState(false)}><ion-icon name="arrow-back-outline"></ion-icon> Add to playlist: </span>
                                        <ul>
                                            {
                                                userPlaylist.map((pl, ind) => {
                                                    return (
                                                        <li><span> {pl.name} <ion-icon name="add-outline"></ion-icon></span></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div> : ''
                                }
                            </li>
                            {
                                !playlist ? <li><ion-icon name="trash-outline"></ion-icon> Remove</li> : ''
                            }
                        </ul> : ''
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div className={"song_back_min"}>
                <div className={"song_left_min"}>
                    <img src={props.img} alt={props.img} />
                    <div>
                        {props.name}
                        <Link to={"/home/artist"}>{props.artist.username}</Link>
                    </div>
                </div>
                <div className={"song_time_min"}>{props.duration}</div>
                <div className={"song_options"}>
                    <ion-icon name="ellipsis-horizontal" id={"open_song_options_btn"} onClick={() => setSongOptionListState(songOptionListState => !songOptionListState)}></ion-icon>
                    {
                        songOptionListState ? <ul className={"options_list"}>
                            <li><ion-icon name="heart"></ion-icon> Add to Like</li>
                            <li className={"add_to_playlist_btn for_options"} onClick={() => setPlaylistAddState(playlistAddState => !playlistAddState)}>
                                <ion-icon name="add-outline" id={"add_to_playlist_btn"}></ion-icon> Add to playlist
                                {
                                    playlistAddState ? <div className="list_to_add">
                                        <span className={"back_to_options"} onClick={() => setPlaylistAddState(false)}><ion-icon name="arrow-back-outline"></ion-icon> Add to playlist: </span>
                                        <ul>
                                            {
                                                userPlaylist.map((pl, ind) => {
                                                    if(!pl.songs.includes(props.id)){
                                                        return (
                                                            <li onClick={() => addUserExactPlaylist(userUID, ind, props.id)}>
                                                                <span> {pl.name} <ion-icon name="add-outline"></ion-icon></span>
                                                            </li>
                                                        )
                                                    } else{
                                                        return (
                                                            <li>
                                                                <span> {pl.name} <ion-icon name="add-outline"></ion-icon></span> ✔
                                                            </li>
                                                        )
                                                    }
  
                                                })
                                            }
                                        </ul>
                                    </div> : ''
                                }
                            </li>
                            {
                                !playlist ? <li><ion-icon name="trash-outline"></ion-icon> Remove</li> : ''
                            }
                        </ul> : ''
                    }
                </div>
            </div>
        )
    }
}

export default PlaylistMusicItem;