import React, {useEffect, useState} from "react";
import './add-to-playlist.css';

import animalsImg from '../../../assets/music/1.png';
import riverImg from '../../../assets/music/2.webp';
import endImg from '../../../assets/music/3.jpeg';
import babymamImg from '../../../assets/music/4.jpeg';
import brendImg from '../../../assets/music/5.jpeg';
import raim1img from '../../../assets/music/Dosym Raim.jpeg';
import dar1img from '../../../assets/music/uide.jpeg';
import dar2img from '../../../assets/music/kun men ayim.jpeg';
import dar3img from '../../../assets/music/shyrailym.jpeg';
import ice1img from "../../../assets/music/ice cube.jpeg"
import ice2img from "../../../assets/music/ice cube 2.jpeg"
import snoopimg from "../../../assets/music/snoop dog.jpeg"


const AddToPlaylist = ({type}) => {

    const [playlistAddState, setPlaylistAddState] = useState(false);

    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "list_to_add" || e.target.className === "list_to_add_ul") {
                setPlaylistAddState(true); return;
            }
            if(e.target.id !== "add_to_playlist_btn" && e.target.className !== "add_to_playlist_btn for_options") {
                setPlaylistAddState(false)
            }
        })
    }, []);

    if(type) {
        return <li className={"add_to_playlist_btn for_options"} onClick={() => setPlaylistAddState(playlistAddState => !playlistAddState)}>
            <ion-icon name="add-outline" id={"add_to_playlist_btn"}></ion-icon> Add to playlist
            {
                playlistAddState
                ?
                    <div className="list_to_add">
                        <span className={"back_to_options"} onClick={() => setPlaylistAddState(false)}><ion-icon name="arrow-back-outline"></ion-icon> Add to playlist: <ion-icon name="arrow-back-outline" style={{opacity: '0'}}></ion-icon></span>
                        <ul className={"list_to_add_ul"}>
                            <li className={"list_to_add_ul"}>
                                <img src={dar1img} alt={dar1img} />
                                <span>qazaqsha olender <ion-icon name="add-outline"></ion-icon></span>
                            </li>
                            <li>
                                <img src={endImg} alt={dar1img} />
                                <span>aǵylshynsha olender <ion-icon name="add-outline"></ion-icon></span>
                            </li>
                            <li>
                                <img src={brendImg} alt={dar1img} />
                                <span>oryssha olender <ion-icon name="add-outline"></ion-icon></span>
                                <ion-icon name="checkmark-outline" id={"in_playlist"}></ion-icon>
                            </li>
                            <li>
                                <img src={dar3img} alt={dar1img} />
                                <span>uiqy ushin <ion-icon name="add-outline"></ion-icon></span>
                            </li>
                            <li>
                                <img src={ice1img} alt={dar1img} />
                                <span>sport ushin <ion-icon name="add-outline"></ion-icon></span>
                            </li>
                            <li>
                                <img src={snoopimg} alt={dar1img} />
                                <span>music in car <ion-icon name="add-outline"></ion-icon></span>
                                <ion-icon name="checkmark-outline" id={"in_playlist"}></ion-icon>
                            </li>
                            <li>
                                <img src={dar1img} alt={dar1img} />
                                <span>for cooking <ion-icon name="add-outline"></ion-icon></span>
                            </li>
                        </ul>
                    </div>
                :
                    ''
            }
        </li>
    }

    return <div className={"add_to_playlist_btn"}>
        <ion-icon name="add-outline" id={"add_to_playlist_btn"} onClick={() => setPlaylistAddState(playlistAddState => !playlistAddState)}></ion-icon>
        {
            playlistAddState
            ?
                <div className="list_to_add">
                    <div id={"close_add_to_playlist"}>
                        <ion-icon name="close-outline" onClick={() => setPlaylistAddState(false)}></ion-icon>
                    </div>
                    <span className={"list_to_add_title"}>Add to playlist:</span>
                    <ul className={"list_to_add_ul"}>
                        <li className={"list_to_add_ul"}>
                            <img src={dar1img} alt={dar1img} />
                            <span>qazaqsha olender <ion-icon name="add-outline"></ion-icon></span>
                        </li>
                        <li>
                            <img src={endImg} alt={dar1img} />
                            <span>aǵylshynsha olender <ion-icon name="add-outline"></ion-icon></span>
                        </li>
                        <li>
                            <img src={brendImg} alt={dar1img} />
                            <span>oryssha olender <ion-icon name="add-outline"></ion-icon></span>
                            <ion-icon name="checkmark-outline" id={"in_playlist"}></ion-icon>
                        </li>
                        <li>
                            <img src={dar3img} alt={dar1img} />
                            <span>uiqy ushin <ion-icon name="add-outline"></ion-icon></span>
                        </li>
                        <li>
                            <img src={ice1img} alt={dar1img} />
                            <span>sport ushin <ion-icon name="add-outline"></ion-icon></span>
                        </li>
                        <li>
                            <img src={snoopimg} alt={dar1img} />
                            <span>music in car <ion-icon name="add-outline"></ion-icon></span>
                            <ion-icon name="checkmark-outline" id={"in_playlist"}></ion-icon>
                        </li>
                        <li>
                            <img src={dar1img} alt={dar1img} />
                            <span>for cooking <ion-icon name="add-outline"></ion-icon></span>
                        </li>
                    </ul>
                </div>
            :
                    ''
        }
    </div>

}

export default AddToPlaylist;