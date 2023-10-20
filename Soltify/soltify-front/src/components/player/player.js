import React, {useEffect, useState} from "react";
import './player.css';

import songImg from '../../assets/music.jpg'

const Player = () => {

    const [playerActive, setPlayerActive] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("playerCondition") === "true") {
            setPlayerActive(true)
        } else setPlayerActive(false)
    }, []);

    function changeImageCursor(event) {
        event.target.offsetWidth < 400 ? event.target.style.cursor = 'pointer' : event.target.style.cursor = 'default'
    }

    function playerActiveCondition(condition) {
        if(condition) {
            setPlayerActive(true)
            localStorage.setItem("playerCondition", "true")
        }
        else {
            setPlayerActive(false)
            localStorage.setItem("playerCondition", "false")
        }
    }

    return (
        <div className={!playerActive ? "background mini" : "background"}>
            <div className="background_layer">
                <div className="close" onClick={() => playerActiveCondition(false)}>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <div className="song_img" onClick={() => playerActiveCondition(true)} onMouseMove={(event) => changeImageCursor(event)}>
                    <img src={songImg} alt={songImg} />
                </div>
                <div className="player_controllers">
                    <div className="song_details">
                        <div className="name">She's On My Mind (Acoustic)</div>
                        <div className="artist">JP Cooper — She's On My Mind</div>
                    </div>
                    <div className="song_center">
                        <div className="song_progress">
                            <div className="progress_bar"></div>
                            <div className="timer">
                                <span className="current">1:24</span>
                                <span className="duration">2:32</span>
                            </div>
                            <audio className="main_audio"></audio>
                        </div>
                        <div className="player_navigation">
                            <ion-icon name="shuffle-outline" id="random"></ion-icon>
                            <div className="center">
                                <ion-icon name="play-skip-back-outline"></ion-icon>
                                <div className="play_pause">
                                    <ion-icon name="play" id="play"></ion-icon>
                                    <ion-icon name="pause-outline" id="pause"></ion-icon>
                                </div>
                                <ion-icon name="play-skip-forward-outline"></ion-icon>
                            </div>
                            <ion-icon name="repeat-outline" id="repeat"></ion-icon>
                        </div>
                    </div>
                    <div className="player_options">
                        <ion-icon name="ellipsis-horizontal"></ion-icon>
                        <ion-icon name="scan-outline" onClick={() => playerActiveCondition(true)}></ion-icon>
                    </div>
                    <div className="song_volume">
                        <ion-icon name="volume-off-outline"></ion-icon>
                        <div className="volume_progress">
                            <div className="volume_progress_bar"></div>
                        </div>
                        <ion-icon name="volume-high-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player;