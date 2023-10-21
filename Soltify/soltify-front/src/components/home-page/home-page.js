import React from "react";
import './home-page.css';

import user from '../../assets/music.jpg';
import logo from '../../assets/logo.png';

import Player from "../player/player";
import {Route, Router, Routes} from "react-router-dom";
import ContentPage from "../content/content-page";

const HomePage = () => {
    return (
        <div className={"background"}>
            <div className={"background_layer"}>
                <div className={"home_top"}>
                    <div className={"menu"}>
                        <div className={"menu_top"}>
                            <img src={logo} alt={logo} />
                        </div>
                        <ul>
                            <li><a href=""><ion-icon name="home-outline"></ion-icon> Home</a></li>
                            <li className={"diff_li"}><a href=""><ion-icon name="add-outline" id="add_playlist"></ion-icon> Create playlist</a></li>
                            <li className={"diff_li"}><a href=""><ion-icon name="heart" id="heart"></ion-icon> Like</a></li>
                            <li className={"playlists"}>
                                <a className={"playlists_title"} href="">Your playlists</a>
                                <ul>
                                    <li><a href="">qazaqsha olender</a></li>
                                    <li><a href="">aǵylshynsha olender</a></li>
                                    <li><a href="">oryssha olender</a></li>
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
                            <a href="" className={"user_link"}>
                                <img src={user} alt={user} />
                            </a>
                        </div>
                        <div className={"content"}>
                        </div>
                    </div>
                </div>
                <Player />
            </div>
        </div>
    )
}

export default HomePage;