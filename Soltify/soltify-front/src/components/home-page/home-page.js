import React from "react";
import './home-page.css';

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