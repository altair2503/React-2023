import React, { useEffect, useState } from "react";
import './search-page.css';

import { Link, useOutletContext } from "react-router-dom";

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";

import animals from "../../assets/music/1.mp3"
import river from "../../assets/music/2.mp3"
import end from "../../assets/music/3.mp3"
import babymama from "../../assets/music/4.mp3"
import brend from "../../assets/music/5.mp3"

import animalsImg from '../../assets/music/1.png';
import riverImg from '../../assets/music/2.webp';
import endImg from '../../assets/music/3.jpeg';
import babymamImg from '../../assets/music/4.jpeg';
import brendImg from '../../assets/music/5.jpeg';

import defaultAvatar from '../../assets/defaultAvatar.jpg';


let playlist = [
    {
        id: 1,
        name: "Животные",
        artist: "Скриптонит",
        url: animals,
        img: animalsImg,
        time: '3:02'
    },
    {
        id: 2,
        name: "Ты не верь слезам",
        artist: "Скриптонит",
        url: river,
        img: riverImg,
        time: '4:17'
    },
    {
        id: 3,
        name: "До конца",
        artist: "Скриптонит",
        url: end,
        img: endImg,
        time: '2:54'
    },
    {
        id: 4,
        name: "Бэби мама",
        artist: "Скриптонит",
        url: babymama,
        img: babymamImg,
        time: '3:51'
    },
    {
        id: 5,
        name: "Мультибрендовый",
        artist: "Скриптонит",
        url: brend,
        img: brendImg,
        time: '4:32'
    },
]
let artists = [
    {
        id: 1,
        name: "Скриптонит",
    },
    {
        id: 2,
        name: "Arctic Monkeys",
    },
    {
        id: 3,
        name: "Jony",
    },
    {
        id: 4,
        name: "Мияги",
    },
    {
        id: 5,
        name: "Darkhan Juzz",
    }
]


const SearchPage = () => {

    const {searchQuery} = useOutletContext();

    const [searchPageQuery, setSearchPageQuery] = useState("")

    const [foundArtists, setFoundArtists] = useState([])
    const [foundSongs, setFoundSongs] = useState([])

    useEffect(() => {
        if(searchQuery !== "") {
            setFoundSongs(playlist.filter(song => {
                return song.name.toLowerCase().includes(searchQuery.toLowerCase())
                    || song.artist.toLowerCase().includes(searchQuery.toLowerCase())
            }))
            setFoundArtists(artists.filter(artist => {
                return artist.name.toLowerCase().includes(searchQuery.toLowerCase())
            }))
        }
        else if(searchPageQuery !== "") {
            setFoundSongs(playlist.filter(song => {
                return song.name.toLowerCase().includes(searchPageQuery.toLowerCase())
                    || song.artist.toLowerCase().includes(searchPageQuery.toLowerCase())
            }))
            setFoundArtists(artists.filter(artist => {
                return artist.name.toLowerCase().includes(searchPageQuery.toLowerCase())
            }))
        }
    }, [searchQuery, searchPageQuery]);

    const fillSearchInput = (query) => {
        if(query === "") {
            setFoundSongs([])
            setFoundArtists([])
        }
        setSearchPageQuery(query)
    }

    return <div className={"search_background"}>
        <div className={"search_page_input"}>
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" value={searchPageQuery} placeholder="Song, artist ..." onChange={e => fillSearchInput(e.target.value)} />
        </div>
            {
                foundArtists.length > 0 || foundSongs.length > 0
                ?
                    <div className={"search_results"}>
                        {
                            foundArtists.length > 0
                            ?
                                <div className={"found_artists"}>
                                    <div className={"found_title"}>Artists</div>
                                    <div className={"found_artists_list"}>
                                        {
                                            foundArtists.map((artist, index) => {
                                                return <Link to={"/home/artist"} className={"found_artist"}>
                                                    <img src={defaultAvatar} alt={defaultAvatar} />
                                                    <div className={"found_artist_info"}>
                                                        <span>{artist.name}</span>
                                                        <ion-icon name="chevron-forward-outline"></ion-icon>
                                                    </div>
                                                </Link>
                                            })
                                        }
                                    </div>
                                </div>
                            :
                                ''
                        }
                        {
                            foundSongs.length > 0
                            ?
                                <div className={"found_songs"}>
                                    <div className={"found_title"}>Songs</div>
                                    <div className={"found_songs_list"}>
                                        {
                                            foundSongs.map((song, index) => {
                                                return <PlaylistMusicItem props={song} type={true} index={index + 1} artist={false} isSearch={true} playlist={playlist} />
                                            })
                                        }
                                    </div>
                                </div>
                            :
                                ''
                        }
                    </div>
                :
                    <div className={"if_zero in_search"}>
                        <ion-icon name="search-outline"></ion-icon>
                        <div>
                            <span>Didn't find anything</span>
                            <span>Try to write in a different way</span>
                        </div>
                    </div>
            }
    </div>
}

export default SearchPage;