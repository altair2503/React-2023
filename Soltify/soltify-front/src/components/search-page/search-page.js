import React, { useEffect, useState } from "react";
import './search-page.css';

import { Link, useOutletContext } from "react-router-dom";

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";

import defaultAvatar from '../../assets/defaultAvatar.jpg';
import {getArtistAndSongs, getArtists, getUserRealTimeData, userUID} from "../services/user-service";
import {getSongs} from "../services/song-service";


// let playlist = [];
// let artists = [];
// await getArtists().then((result) => setArtists(result));
// await getSongs().then((result) => setPlaylist(result));


const SearchPage = () => {
    const [playlist, setPlaylist] = useState([]);
    const [artists, setArtists] = useState([]);
    const {searchQuery, user} = useOutletContext();


    const [searchPageQuery, setSearchPageQuery] = useState("")

    const [foundArtists, setFoundArtists] = useState([])
    const [foundSongs, setFoundSongs] = useState([])

    useEffect(() => {
        if(searchQuery !== "") {
            setFoundSongs(playlist.filter(song => {
                return song.name.toLowerCase().includes(searchQuery.toLowerCase())
                    || song.artist.username.toLowerCase().includes(searchQuery.toLowerCase())
            }))
            setFoundArtists(artists.filter(artist => {
                return artist.username.toLowerCase().includes(searchQuery.toLowerCase())
            }))
        }
        else if(searchPageQuery !== "") {
            setFoundSongs(playlist.filter(song => {
                return song.name.toLowerCase().includes(searchPageQuery.toLowerCase())
                    || song.artist.username.toLowerCase().includes(searchPageQuery.toLowerCase())
            }))
            setFoundArtists(artists.filter(artist => {
                return artist.username.toLowerCase().includes(searchPageQuery.toLowerCase())
            }))
        }
    }, [searchQuery, searchPageQuery, playlist, artists]);

    useEffect( () => {
        const fetchUserData = async () => {
            try {
                await getArtists().then((result) => setArtists(result));
                await getSongs().then((result) => setPlaylist(result));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [])

    useEffect(() => {
        console.log(playlist);
        console.log(artists);
    }, [playlist, artists]);

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
                                                return <Link to={`/home/artist/${artist.username}`} className={"found_artist"}>
                                                    <img src={artist?.img ? artist?.img : defaultAvatar} alt={defaultAvatar} />
                                                    <div className={"found_artist_info"}>
                                                        <span>{artist.username}</span>
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
                                                return <PlaylistMusicItem props={song} type={true} index={index} user={user} artist={false} isSearch={true} playlist={foundSongs} isPlaylist={true    } />
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