import React, {useEffect} from "react";
import './home-page.css';

import user from '../../assets/music.jpg';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';

import Player from "../player/player";
import { Outlet, Route, Router, Routes, useNavigate, Link } from "react-router-dom";

import ContentPage from "../content/content-page";

const HomePage = () => {

    const navigate = useNavigate();

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
                                    <li><Link to="">qazaqsha olender</Link></li>
                                    <li><Link to="">aǵylshynsha olender</Link></li>
                                    <li><Link to="/home/playlists/oryssha-olender">oryssha olender</Link></li>
                                    <li><Link to="">uiqy ushin</Link></li>
                                    <li><Link to="">sport ushin</Link></li>
                                    <li><Link to="">music in car</Link></li>
                                    <li><Link to="">for cooking</Link></li>
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