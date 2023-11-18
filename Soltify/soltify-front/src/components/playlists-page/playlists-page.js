import React, {useState} from "react";
import './playlists-page.css';

import { Link } from "react-router-dom";

import playlistLogo from '../../assets/music.jpg';
import playlistLogo2 from '../../assets/music/5.jpeg';
import playlistLogo3 from '../../assets/music/3.jpeg';
import playlistLogo4 from '../../assets/music/50 cent 2.jpeg';
import playlistDefault from "../../assets/playlistdefault.jpg";

const PlaylistsPage = () => {

    const [state, setState] = useState(false);

    return <div className={"playlists_back"}>
        <span className={"playlists_title"}>Your Playlists</span>
        <div className={"playlists_description"}>Now you have • 4 Playlist</div>
        <div className={"playlists_list"}>
            <Link to={"/home/create-playlist"} className={"playlist_item create_playlist_item"}>
                <div className={"playlist_add_img"}>
                    <ion-icon name="add-outline"></ion-icon>
                </div>
                <div className={"playlist_item_info"}>
                    <span style={{opacity: 1}}>New Playlist...</span>
                </div>
            </Link>
            <Link to={""} className={"playlist_item"}>
                {
                    state ? <img src={playlistDefault} alt={playlistDefault} /> : <img src={playlistLogo} alt={playlistLogo} />
                }
                <div className={"playlist_item_info"}>
                    <span>qazaqsha olender</span>
                    <span>23 songs</span>
                </div>
                <ion-icon name="chevron-forward-outline" id={"playlist_item_open_btn"}></ion-icon>
            </Link>
            <Link to={"/home/playlists/oryssha-olender"} className={"playlist_item"}>
                {
                    state ? <img src={playlistDefault} alt={playlistDefault} /> : <img src={playlistLogo2} alt={playlistLogo} />
                }
                <div className={"playlist_item_info"}>
                    <span>oryssha olender</span>
                    <span>23 songs</span>
                </div>
                <ion-icon name="chevron-forward-outline" id={"playlist_item_open_btn"}></ion-icon>
            </Link>
            <Link to={""} className={"playlist_item"}>
                {
                    !state ? <img src={playlistDefault} alt={playlistDefault} /> : <img src={playlistLogo} alt={playlistLogo} />
                }
                <div className={"playlist_item_info"}>
                    <span>aǵylshynsha olender</span>
                    <span>23 songs</span>
                </div>
                <ion-icon name="chevron-forward-outline" id={"playlist_item_open_btn"}></ion-icon>
            </Link>
            <Link to={""} className={"playlist_item"}>
                {
                    state ? <img src={playlistDefault} alt={playlistDefault} /> : <img src={playlistLogo3} alt={playlistLogo} />
                }
                <div className={"playlist_item_info"}>
                    <span>uiqy ushin</span>
                    <span>23 songs</span>
                </div>
                <ion-icon name="chevron-forward-outline" id={"playlist_item_open_btn"}></ion-icon>
            </Link>
        </div>
    </div>

}

export default PlaylistsPage;