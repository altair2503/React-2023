import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import Player from "../player/player";
import './home-page.css';

import userImg from '../../assets/music.jpg';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';

import { getUserPlaylist } from "../services/playlist-service";

import { getSongs } from "../services/song-service";
import { userUID } from "../services/user-service";

let playList = [];
let songs = [];

if(userUID) {
    await getUserPlaylist(userUID)
    .then((result) => {
        playList = result;
    });
    await getSongs().then((result) => { songs = result })
}


const HomePage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [playlist, setPlaylist] = useState(songs);
    const [index, setIndex] = useState(0);

    const [topBarTitle, setTopBarTitle] = useState("Soltify");
    const [hideAccount, setHideAccount] = useState(true);
    const [hideSearch, setHideSearch] = useState(true);

    useEffect(() => {
        changeTopBarTitle();
        changeSearchAndAccountBtn();
    }, [location])

    const changeTopBarTitle = () => {
        if(location.pathname === "/home/playlists") setTopBarTitle("Playlists")
        else if(location.pathname.includes("/home/artist")) setTopBarTitle("Artist")
        else if(location.pathname.includes("/home/playlists/")) setTopBarTitle("Playlist")
        else if(location.pathname === "/home/create-playlist") setTopBarTitle("Create PL")
        else if(location.pathname === "/home/account") setTopBarTitle("Account")
        else if(location.pathname === "/home/") setTopBarTitle("Liked")
        else setTopBarTitle("Soltify")
    }

    const changeSearchAndAccountBtn = () => {
        setHideSearch(true)
        setHideAccount(false)
        if(window.innerWidth < 451) {
            if (
                location.pathname === "/home/playlists" ||
                location.pathname === "/home/" ||
                location.pathname === "/home"
            ) {
                setHideAccount(false)
            } else if(location.pathname === "/home/account") {
                setHideAccount(true)
                setHideSearch(false)
            } else {
                setHideAccount(true)
            }
        }
    }

    const Logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/");
        } catch(error) {
            console.log(error)
        }
    }

    return <div className={"background"}>
        <div className={"background_layer"}>
            <div className={"home_top"}>
                <div className={"menu"}>
                    <Link to="/home" className={"menu_top"}>
                        <img src={logo} alt={logo} />
                    </Link>
                    <ul>
                        <li><Link to="/home"><ion-icon name="home-outline"></ion-icon> <span>Home</span></Link></li>
                        <li className={"diff_li"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : navigate('/home/create-playlist')}><Link><ion-icon name="add-outline" id="add_playlist"></ion-icon> <span>Create playlist</span></Link></li>
                        <li className={"diff_li"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}><Link><ion-icon name="heart" id="heart"></ion-icon> <span>Like</span></Link></li>
                        <li className={"playlists"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}>
                            <Link className={"playlists_title"} to="/home/playlists">Your playlists</Link>
                            <ul>
                                {
                                    playList.map((playlist, index) => {
                                        return <li>
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
                                    }
                                )}
                            </ul>
                        </li>
                        <li><Link to={"/home/"}><ion-icon name="heart-outline" id={"menu_heart"}></ion-icon></Link></li>
                        <li><Link to={"/home/playlists"}><ion-icon name="folder-open-outline"></ion-icon></Link></li>
                    </ul>
                </div>
                <div className={"home_container"}>
                    <div className={"top_bar"}>
                        {
                            !hideSearch
                            ?
                                <ion-icon name="log-out-outline" onClick={Logout} id={"button_for_logout"}></ion-icon>
                            :
                                <div className={"search"}>
                                    <input type="text" placeholder="Search..."/>
                                    <button className={"search_btn"}>
                                        <ion-icon name="search-outline"></ion-icon>
                                    </button>
                                </div>
                        }
                        <span className={"top_bar_title"}>{topBarTitle}</span>
                        {
                            !hideAccount
                            ?
                                <Link to={localStorage.getItem("user") ? "/home/account" : "/log-in"} className={"user_link"}>
                                    { localStorage.getItem("user") == null ? <div className="default_avatar"><img src={avatar} alt={avatar} /></div> : <img src={userImg} alt={userImg} /> }
                                </Link>
                            :
                                <ion-icon name="chevron-back-outline" onClick={() => navigate(-1)} id={"go_back_button"}></ion-icon>
                        }
                    </div>
                    <div className={"content"}>
                        <Outlet context={{playlist, setPlaylist, index, setIndex}} />
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

}


export default HomePage;
