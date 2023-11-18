import React, {useEffect, useState} from "react";
import './playlist-page.css';

import playlistDefault from '../../assets/playlistdefault.jpg';
import likedPlaylist from '../../assets/likedplaylist.jpg';

import animals from "../../assets/music/1.mp3"
import river from "../../assets/music/2.mp3"
import end from "../../assets/music/3.mp3"
import babymama from "../../assets/music/4.mp3"
import brend from "../../assets/music/5.mp3"

import animalsImg from '../../assets/music/1.png';
import riverImg from '../../assets/music/2.webp';
import endImg from '../../assets/music/3.jpeg';
import babymamImg from '../../assets/music/4.jpeg';
import brendImg from '../../assets/music/5.jpeg';

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import Input from "../utilities/input/input";

let playlist = [
    {
        id: 1,
        name: "Животные",
        artist: "Скриптонит",
        url: animals,
        img: animalsImg,
        time: '3:02'
    },
    {
        id: 2,
        name: "Ты не верь слезам",
        artist: "Скриптонит",
        url: river,
        img: riverImg,
        time: '4:17'
    },
    {
        id: 3,
        name: "До конца",
        artist: "Скриптонит",
        url: end,
        img: endImg,
        time: '2:54'
    },
    {
        id: 4,
        name: "Бэби мама",
        artist: "Скриптонит",
        url: babymama,
        img: babymamImg,
        time: '3:51'
    },
    {
        id: 5,
        name: "Мультибрендовый",
        artist: "Скриптонит",
        url: brend,
        img: brendImg,
        time: '4:32'
    },
];

const PlaylistPage = () => {

    const [deletePopupState, setDeletePopupState] = useState(false);
    const [updatePopupState, setUpdatePopupState] = useState(false);

    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "delete_popup_back") {
                setDeletePopupState(false); setUpdatePopupState(false);
            }
        })
    }, [])

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
                    <div className={"delete_popup update"}>
                        <ion-icon name="close-outline" onClick={() => setUpdatePopupState(false)}></ion-icon>
                        <span>Update Playlist</span>
                        <div className={"playlist_ft_imf update"}>
                            <input type="file" id={"img_for_playlist"}/>
                            <img src={likedPlaylist} alt={playlistDefault}/>
                            <label htmlFor="img_for_playlist"></label>
                        </div>
                        <div className={"input_block"}>
                            <input name="lastname" type="text" placeholder={"Enter playlist name"} />
                        </div>
                        <div className={"decision_btns"}>
                            <button>Change</button>
                        </div>
                    </div>
                </div>
            :
                ''
        }
        <div className={"playlist_info_back"}>
            <img src={likedPlaylist} className={"playlist_info_back_img"} alt={playlistDefault} />
            <div className={"playlist_info"}>
                <div className={"playlist_img"}>
                    <img src={likedPlaylist} alt={playlistDefault} />
                </div>
                <div className={"playlist_details"}>
                    <span>Playlist</span>
                    <div className={"playlist_name"}>oryssha olender</div>
                    <div className={"playlist_owner"}>azikkw <span>•</span> 23 songs</div>
                    <div className={"playlist_options"}>
                        <button className={"play_playlist"}>Play</button>
                        <div className={"update_option"} onClick={() => setUpdatePopupState(true)}>
                            <ion-icon name="create-outline"></ion-icon>
                        </div>
                        <div className={"delete_option"} onClick={() => setDeletePopupState(true)}>
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                    </div>
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
            <div className={"playlist_song_list"}>
                {
                    playlist.map((song, index) => {
                        return <PlaylistMusicItem props={song} index={index + 1} type={true}/>
                    })
                }
                {
                    playlist.map((song, index) => {
                        return <PlaylistMusicItem props={song} index={index + 6} type={true}/>
                    })
                }
            </div>
        </div>
    </div>

}

export default PlaylistPage;