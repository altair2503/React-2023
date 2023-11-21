import React from "react";
import './artist-page.css';

import avatar from "../../assets/avatar.png";
import userImg from "../../assets/music.jpg";
import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import animals from "../../assets/music/1.mp3";
import animalsImg from "../../assets/music/1.png";
import river from "../../assets/music/2.mp3";
import riverImg from "../../assets/music/2.webp";
import end from "../../assets/music/3.mp3";
import endImg from "../../assets/music/3.jpeg";
import babymama from "../../assets/music/4.mp3";
import babymamImg from "../../assets/music/4.jpeg";
import brend from "../../assets/music/5.mp3";
import brendImg from "../../assets/music/5.jpeg";
import likedPlaylist from "../../assets/likedplaylist.jpg";
import playlistDefault from "../../assets/playlistdefault.jpg";


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

const ArtistPage = () => {
    return <div className={"artist_back"}>
        <div className={"artist_info_back"}>
            <img src={playlistDefault} className={"artist_info_back_img"} alt={playlistDefault} />
            <div className={"artist_top"}>
                { localStorage.getItem("user") != null ? <div className="default_img"><img src={avatar} alt={avatar} /></div> : <img src={userImg} alt={userImg} /> }
                <div className={"artist_info"}>
                    <span>Artist</span>
                    <div className={"artist_name"}>Scriptonite</div>
                    <div className={"artist_songs"}>35 songs</div>
                    <button className={"play_artist"}>Play</button>
                </div>
            </div>
        </div>
        <div className={"artist_music"}>
            <div className={"titles"}>
                <div>#</div>
                <div>Song</div>
                <div className={"artist_titles_time"}>Time</div>
            </div>
            <div className={"artist_song_list"}>
                {
                    playlist.map((song, index) => {
                        return <PlaylistMusicItem props={song} index={index + 1} type={true} artist={true} isPlaylist={true} />
                    })
                }
            </div>
        </div>
    </div>
}

export default ArtistPage;