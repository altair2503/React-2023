import React, {useState} from "react";
import './playlists-page.css';

import { Link } from "react-router-dom";

import playlistLogo from '../../assets/music.jpg';
import playlistLogo2 from '../../assets/music/5.jpeg';
import playlistLogo3 from '../../assets/music/3.jpeg';
import playlistLogo4 from '../../assets/music/50 cent 2.jpeg';

const PlaylistsPage = () => {

    const [state, setState] = useState(false);

    return <div className={"playlists_back"}>
        <span className={"acc_title"}>Your Playlists</span>
        <div className={"playlists_list"}>
            <Link to={""} className={"playlist_item"}>
                {
                    !state ? <div className={"playlist_img"}>
                        <ion-icon name="musical-notes-outline"></ion-icon>
                    </div> : <img src={playlistLogo3} alt={playlistLogo} />
                }
                <span>qazaqsha olender</span>
            </Link>
            <Link to={""} className={"playlist_item"}>
                {
                    state ? <div className={"playlist_img"}>
                        <ion-icon name="musical-notes-outline"></ion-icon>
                    </div> : <img src={playlistLogo} alt={playlistLogo} />
                }
                <span>aǵylshynsha olender</span>
            </Link>
            <Link to={"/home/playlists/oryssha-olender"} className={"playlist_item"}>
                {
                    state ? <div className={"playlist_img"}>
                        <ion-icon name="musical-notes-outline"></ion-icon>
                    </div> : <img src={playlistLogo2} alt={playlistLogo} />
                }
                <span>oryssha olender</span>
            </Link>
            <Link to={""} className={"playlist_item"}>
                {
                    !state ? <div className={"playlist_img"}>
                        <ion-icon name="musical-notes-outline"></ion-icon>
                    </div> : <img src={playlistLogo} alt={playlistLogo} />
                }
                <span>uiqy ushin</span>
            </Link>
            <Link to={""} className={"playlist_item"}>
                {
                    state ? <div className={"playlist_img"}>
                        <ion-icon name="musical-notes-outline"></ion-icon>
                    </div> : <img src={playlistLogo3} alt={playlistLogo} />
                }
                <span>sport ushin</span>
            </Link>
            <Link to={""} className={"playlist_item"}>
                {
                    state ? <div className={"playlist_img"}>
                        <ion-icon name="musical-notes-outline"></ion-icon>
                    </div> : <img src={playlistLogo4} alt={playlistLogo} />
                }
                <span>music in car</span>
            </Link>
        </div>
    </div>

}

export default PlaylistsPage;