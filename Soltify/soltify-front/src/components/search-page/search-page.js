import React from "react";
import './search-page.css';

import {Link, useOutletContext} from "react-router-dom";

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";

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

import defaultAvatar from '../../assets/defaultAvatar.jpg';

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


const SearchPage = () => {

    const {searchQuery} = useOutletContext();

    return <div className={"search_background"}>
        <div className={"search_page_input"}>
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" placeholder="Search..." />
        </div>
        <div className={"search_results"}>
            <div className={"found_artists"}>
                <div className={"found_title"}>Artists</div>
                <div className={"found_artists_list"}>
                    <Link to={""} className={"found_artist"}>
                        <img src={defaultAvatar} alt={defaultAvatar} />
                        <div className={"found_artist_info"}>
                            <span>Skryptonite</span>
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </div>
                    </Link>
                    <Link to={""} className={"found_artist"}>
                        <img src={defaultAvatar} alt={defaultAvatar} />
                        <div className={"found_artist_info"}>
                            <span>Skryptonite</span>
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </div>
                    </Link>
                    <Link to={""} className={"found_artist"}>
                        <img src={defaultAvatar} alt={defaultAvatar} />
                        <div className={"found_artist_info"}>
                            <span>Skryptonite</span>
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={"found_songs"}>
                <div className={"found_title"}>Songs</div>
                <div className={"found_songs_list"}>
                    {
                        playlist.map((song, index) => {
                            return <PlaylistMusicItem props={song} type={true} index={index + 1} artist={false} isSearch={true} playlist={playlist} />
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}

export default SearchPage;