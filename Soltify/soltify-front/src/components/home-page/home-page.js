import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Player from "../player/player";
import './home-page.css';
import avatar from '../../assets/music.jpg';
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import logo from '../../assets/logo.png';
import { getSongs } from "../services/song-service";
import {getUserRealTimeData, userUID} from "../services/user-service";


const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [playlist, setPlaylist] = useState(false);
    const [index, setIndex] = useState(0);
    const [topBarTitle, setTopBarTitle] = useState("Soltify");
    const [hideAccount, setHideAccount] = useState(true);
    const [hideSearch, setHideSearch] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState({});


    useEffect(() => {
        if(!localStorage.getItem("user")) navigate("/")
    })

    useEffect(() => {
        changeTopBarTitle();
        changeSearchAndAccountBtn();
    }, [location])

    const changeTopBarTitle = () => {
        if(location.pathname === "/home/playlists") setTopBarTitle("Playlists")
        else if(location.pathname.includes("/home/artist")) setTopBarTitle("Artist")
        else if(location.pathname.includes("/home/playlists/")) setTopBarTitle("Playlist")
        else if(location.pathname === "/home/create-playlist-page") setTopBarTitle("Create PL")
        else if(location.pathname === "/home/search") setTopBarTitle("Search")
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

    const openSearchPage = () => {
        if(window.innerWidth < 451) navigate("/home/search")
        if(searchQuery !== "") navigate("/home/search")
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                getUserRealTimeData(userUID, setUser);
                await getSongs().then((result) => {setPlaylist(result)});
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [])

    return <div className={"background"}>
        <div className={"background_layer"}>
            <div className={"home_top"}>
                <div className={"menu"}>
                    <Link to="/home" className={"menu_top"}>
                        <img src={logo} alt={logo} />
                    </Link>
                    <ul>
                        <li><Link to="/home"><ion-icon name="home-outline"></ion-icon> <span>Home</span></Link></li>
                        <li className={"diff_li"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : navigate('/home/create-playlist-page')}><Link><ion-icon name="add-outline" id="add_playlist"></ion-icon> <span>Create playlist</span></Link></li>
                        <li className={"diff_li"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}><Link to={`/home/playlists/0`} state={{userID: (JSON).parse(localStorage.getItem('user')).uid, playlistIndex: 0}}><ion-icon name="heart" id="heart"></ion-icon> <span>Like</span></Link></li>
                        <li className={"playlists"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}>
                            <Link className={"playlists_title"} to="/home/playlists">Your playlists</Link>
                            <div>
                                {
                                    user?.playlist?.length > 1 ?
                                    user?.playlist?.map((userPL, index) => {
                                        return index !== 0 ? <Link
                                            to={`/home/playlists/${index}`}
                                            state={
                                                {
                                                    userID: userUID,
                                                    playlistIndex: index
                                                }
                                            }
                                        >
                                            {userPL.name}
                                            </Link> : ''
                                        })
                                    :
                                        <Link to={"/home/create-playlist-page"}>
                                            <span>
                                                You don't have playlists yet. <span style={{textDecoration: 'underline'}}>Create a playlist</span>
                                            </span>
                                        </Link>
                                }
                            </div>
                        </li>
                        <li><Link to={`/home/playlists/0`} state={{userID: (JSON).parse(localStorage.getItem('user')).uid, playlistIndex: 0}}><ion-icon name="heart-outline" id={"menu_heart"}></ion-icon></Link></li>
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
                                    <input type="text" value={searchQuery} placeholder="Song, artist ..." onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === "Enter" ? openSearchPage() : ''} />
                                    <button className={"search_btn"} onClick={openSearchPage}>
                                        <ion-icon name="search-outline"></ion-icon>
                                    </button>
                                </div>
                        }
                        <span className={"top_bar_title"}>{topBarTitle}</span>
                        {
                            !hideAccount
                            ?
                                <Link to={localStorage.getItem("user") ? "/home/account" : "/log-in"} className={"user_link"}>
                                    { <img src={user.img === "" ? defaultAvatar : user.img} alt={defaultAvatar} /> }
                                </Link>
                            :
                                <ion-icon name="chevron-back-outline" onClick={() => navigate(-1)} id={"go_back_button"}></ion-icon>
                        }
                    </div>
                    <div className={"content"}>
                        <Outlet context={{playlist, user, setPlaylist, index, setIndex, searchQuery}} />
                    </div>
                </div>
            </div>
            {playlist ?
                <Player
                props={{
                    "playlist": playlist,
                    "index": index,
                }}
                user={user}
                /> : ""}
        </div>
    </div>

}


export default HomePage;
