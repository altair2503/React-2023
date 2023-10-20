import React from "react";
import './home-page.css';

import user from '../../assets/music.jpg';

import Player from "../player/player";

const HomePage = () => {
    return (
        <div className={"background"}>
            <div className={"background_layer"}>
                <div className={"home_top"}>
                    <div className={"menu"}>

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