import React, {useEffect, useState} from "react";
import './playlist-music-item.css';

import {Link, useNavigate, useOutletContext} from "react-router-dom";
import { getUserPlaylist } from "../../services/playlist-service";
import { userUID } from "../../services/user-service";

import crown from '../../../assets/crown.svg';
import AddToPlaylist from "../add-to-playlist/add-to-playlist";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";

const PlaylistMusicItem = ({props, index, type, isPlaylist, artist, playlist, isSearch, user, plIndex}) => {
    const [playlistAddState, setPlaylistAddState] = useState(false);
    const [songOptionListState, setSongOptionListState] = useState(false);
    const navigate = useNavigate();

    const {setPlaylist} = useOutletContext();
    const {setIndex} = useOutletContext();

    const selectSong = (songs, index)=> {
        setPlaylist(songs);
        setIndex(index);
    }

    const removeFromPlaylist = async () => {
        const userRef = doc(db, "users", (JSON).parse(localStorage.getItem('user')).uid);
        let upl = user.playlist;
        upl[plIndex]?.songs.splice(index - 1, 1)

        await updateDoc(userRef, {
            "playlist": upl
        });
    }

    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "back_to_options") {
                setPlaylistAddState(false)
            }
            if(e.target.className === "add_to_playlist_btn for_options") {
                setPlaylistAddState(true); return
            }
            if(e.target.className === "options_list_li") {
                setSongOptionListState(true); return;
            }
            if(e.target.className === "list_to_add_ul") {
                setPlaylistAddState(true); return;
            }
            if(e.target.id !== "open_song_options_btn" && e.target.className !== "back_to_options") {
                setSongOptionListState(false)
            }
        })
    }, [])


    if(type) {
        return (
            <div className={"song_back"} onClick={() => selectSong(playlist, index - 1)}>
                {
                    !isSearch
                    ?
                        <div className={"song_place"}>
                            <span className={"place_index"}>{index}</span>
                        </div>
                    :
                        ''
                }
                <div className={"song_left"}>
                    <img src={props.img} alt={props?.img} />
                    <div>
                        {props?.name}
                        <Link to={`/home/artist/${props.artist.username}`}>{props.artist.username}</Link>
                    </div>
                </div>
                {
                    !artist ? <Link to={`/home/artist/${props.artist.username}`} className={"song_artist"}>{props?.artist.username}</Link> : ''
                }
                <div className={!artist ? "song_time" : "song_time_artist"}>{props?.time}</div>
                <div className={"song_time"}>{props?.duration}</div>
                <div className={"song_options"}>
                    <ion-icon name="ellipsis-horizontal" id={"open_song_options_btn"} onClick={() => setSongOptionListState(songOptionListState => !songOptionListState)} style={isSearch ? {color: '#fff'} : {color: '#25DC60'}}></ion-icon>
                    {
                        songOptionListState
                        ?
                            <ul className={"options_list"}>
                                <li className={"options_list_li"}><ion-icon name="heart"></ion-icon> Add to Like</li>
                                <AddToPlaylist type={true} user={user} id={props?.id} />
                                {
                                    !isPlaylist ? <li onClick={removeFromPlaylist}><ion-icon name="trash-outline"></ion-icon> Remove</li> : ''
                                }
                            </ul>
                        :
                            ''
                    }
                </div>
            </div>
        )
    }

    return <div className={"song_back_min"} onClick={() => selectSong(playlist, index - 1)}>
        {
            !isSearch
            ?
                <div className={"song_place"}>
                    <span className={"place_index"}>{index}</span>
                    <span>-</span>
                    <img src={crown} alt={crown} />
                </div>
            :
                ''
        }
        <div className={"song_left_min"}>
            <img src={props?.img} alt={props?.img} />
            <div>
                {props?.name}
                <Link to={`/home/artist/${props?.artist?.username}`}>{props?.artist?.username}</Link>
            </div>
        </div>
        <div className={"song_time_min"}>{props?.duration}</div>
        <div className={"song_options"}>
            <ion-icon name="ellipsis-horizontal" id={"open_song_options_btn"} onClick={() => setSongOptionListState(songOptionListState => !songOptionListState)}></ion-icon>
            {
                songOptionListState
                ?
                    <ul className={"options_list"}>
                        <li><ion-icon name="heart"></ion-icon> Add to Like</li>
                        <AddToPlaylist type={true} user={user} id={props?.id} />
                        {
                            !isPlaylist ? <li onClick={removeFromPlaylist}><ion-icon name="trash-outline"></ion-icon> Remove </li> : ''
                        }
                    </ul>
                :
                    ''
            }
        </div>
    </div>
}

export default PlaylistMusicItem;