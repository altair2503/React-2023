import React, {useEffect, useState} from "react";
import './home-page.css';

import user from '../../assets/music.jpg';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';
import { getUserPlaylist } from "../services/playlist-service";

import Player from "../player/player";
import { Outlet, Route, Router, Routes, useNavigate, Link } from "react-router-dom";

import ContentPage from "../content/content-page";
import { getSongs } from "../services/song-service";
import { userUID } from "../services/user-service";

let playList = [];
let songs = [];

if(userUID){
    await getUserPlaylist(userUID)
            .then((result) => {
                playList = result;
            });
    }

await getSongs()
    .then((result) => {
        songs = result;
    })

const HomePage = () => {
    const [playlist, setPlaylist] = useState(songs);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
       
    }, [playlist, index]);

    console.log(playList);

    return (
        <div className={"background"}>
            <div className={"background_layer"}>
                <div className={"home_top"}>
                    <div className={"menu"}>
                        <Link to="/home" className={"menu_top"}>
                            <img src={logo} alt={logo} />
                        </Link>
                        <ul>
                            <li><Link to="/home"><ion-icon name="home-outline"></ion-icon> Home</Link></li>
                            <li className={"diff_li"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : navigate('/home/create-playlist')}><Link><ion-icon name="add-outline" id="add_playlist"></ion-icon> Create playlist</Link></li>
                            <li className={"diff_li"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}><Link><ion-icon name="heart" id="heart"></ion-icon> Like</Link></li>
                            <li className={"playlists"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}>
                                <Link className={"playlists_title"} to="/home/playlists">Your playlists</Link>
                                <ul>
                                    {playList.map((playlist, index) => {
                                        return  <li>
                                                    <Link 
                                                        to={`/home/playlists/${playlist.name}`} 
                                                        className={"playlist_item"}
                                                        state={
                                                            {   
                                                                userID: (JSON).parse(localStorage.getItem('user')).uid,
                                                                playlistIndex: index
                                                            }
                                                        }
                                                    > 
                                                        {playlist.name}
                                                    </Link>
                                                </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className={"home_container"}>
                        <div className={"top_bar"}>
                            <div className={"search"}>
                                <input type="text" placeholder="Search..."/>
                                <button className={"search_btn"}>
                                    <ion-icon name="search-outline"></ion-icon>
                                </button>
                            </div>
                            <Link to={localStorage.getItem("user") != null ? "/home/account" : "/log-in"} className={"user_link"}>
                                { localStorage.getItem("user") != null ? <div className="default_avatar"><img src={avatar} alt={avatar} /></div> : <img src={user} alt={user} /> }
                            </Link>
                        </div>
                        <div className={"content"}>
                            <Outlet context={{playlist, setPlaylist, index, setIndex}}/>
                        </div>
                    </div>
                </div>
                <Player 
                    props={{
                        "playlist": playlist,
                        "index": index
                    }}
                />
            </div>
        </div>
    )
}


export default HomePage;
