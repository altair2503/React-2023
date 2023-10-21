import React from "react";
import './playlist-page.css';

import img from '../../assets/logo.png';

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
    return (
        <div className={"playlist_background"}>
            <div className={"playlist_info"}>
                <div className={"playlist_img"}>
                    <ion-icon name="musical-notes-outline"></ion-icon>
                    {/*<img src={img} alt={img} />*/}
                </div>
                <div className={"playlist_details"}>
                    <span>Playlist</span>
                    <div className={"playlist_name"}>oryssha olender</div>
                    <div className={"playlist_owner"}>azikkw <span>•</span> 8 songs</div>
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
                <div className={"song_list"}>
                    {
                        playlist.map((song, index) => {
                            return <PlaylistMusicItem props={song} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage;