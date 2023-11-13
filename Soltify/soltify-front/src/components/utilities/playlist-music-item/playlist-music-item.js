import React, {useEffect, useState} from "react";
import './playlist-music-item.css';
import {Link} from "react-router-dom";

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
                <Link to={"/home/artist"} className={"song_artist"}>{props.artist}</Link>
                <div className={"song_time"}>{props.time}</div>
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
                                            <li><span>qazaqsha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>aǵylshynsha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>oryssha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>uiqy ushin <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>sport ushin <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>music in car <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>for cooking <ion-icon name="add-outline"></ion-icon></span></li>
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
                        <Link to={"/home/artist"}>{props.artist}</Link>
                    </div>
                </div>
                <div className={"song_time_min"}>3:57</div>
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
                                            <li><span>qazaqsha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>aǵylshynsha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>oryssha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>uiqy ushin <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>sport ushin <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>music in car <ion-icon name="add-outline"></ion-icon></span></li>
                                            <li><span>for cooking <ion-icon name="add-outline"></ion-icon></span></li>
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