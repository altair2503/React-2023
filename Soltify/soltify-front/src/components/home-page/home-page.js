import React, {useEffect} from "react";
import './home-page.css';

import user from '../../assets/music.jpg';
import logo from '../../assets/logo.png';

import Player from "../player/player";
import {Outlet, Route, Router, Routes, useNavigate} from "react-router-dom";
import ContentPage from "../content/content-page";

import { Link } from "react-router-dom";


const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className={"background"}>
            <div className={"background_layer"}>
                <div className={"home_top"}>
                    <div className={"menu"}>
                        <a href="/" className={"menu_top"}>
                            <img src={logo} alt={logo} />
                        </a>
                        <ul>
                            <li><a href="/"><ion-icon name="home-outline"></ion-icon> Home</a></li>
                            <li className={"diff_li"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : navigate('/create-playlist')}><a><ion-icon name="add-outline" id="add_playlist"></ion-icon> Create playlist</a></li>
                            <li className={"diff_li"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}><a href=""><ion-icon name="heart" id="heart"></ion-icon> Like</a></li>
                            <li className={"playlists"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}>
                                <a className={"playlists_title"} href="">Your playlists</a>
                                <ul>
                                    <li><a href="">qazaqsha olender</a></li>
                                    <li><a href="">aǵylshynsha olender</a></li>
                                    <li><a><Link to="/playlists/oryssha-olender">oryssha olender</Link></a></li>
                                    <li><a href="">uiqy ushin</a></li>
                                    <li><a href="">sport ushin</a></li>
                                    <li><a href="">music in car</a></li>
                                    <li><a href="">for cooking</a></li>
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
                            {
                                localStorage.getItem("user") != null ?
                                <a href="/account" className={"user_link"}>
                                    <img src={user} alt={user} />
                                </a> : <a href="/log-in" className={"user_link"}>
                                        <img src={user} alt={user} />
                                    </a>
                            }
                        </div>
                        <div className={"content"}>
                            <Outlet />
                        </div>
                    </div>
                </div>
                <Player/>
            </div>
        </div>
    )
}

export default HomePage;