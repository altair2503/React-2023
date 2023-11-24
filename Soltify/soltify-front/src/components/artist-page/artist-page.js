import React, {useEffect, useState} from "react";
import './artist-page.css';

import avatar from "../../assets/music.jpg";
import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import playlistDefault from "../../assets/playlistdefault.jpg";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import {useOutletContext, useParams} from "react-router-dom";
import {getArtistAndSongs} from "../services/user-service";



const ArtistPage = () => {
    const [artist, setArtist] = useState();
    const {username} = useParams();
    const {setPlaylist} = useOutletContext();
    const {setIndex} = useOutletContext();

    const startPlaylist = () => {
        setPlaylist(artist?.songs);
        setIndex(0);
        console.log(artist?.songs);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                getArtistAndSongs(username)
                    .then((u) => {
                        setArtist(u);
                    });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return <div className={"artist_back"}>
        <div className={"artist_info_back"}>
            <img src={playlistDefault} className={"artist_info_back_img"} alt={playlistDefault} />
            <div className={"artist_top"}>
                { <img src={artist?.avatar ? artist?.avatar : defaultAvatar} alt={defaultAvatar} /> }
                <div className={"artist_info"}>
                    <span>Artist</span>
                    <div className={"artist_name"}>{artist?.username}</div>
                    <div className={"artist_songs"}>{artist?.songs.length} songs</div>
                    <button className={"play_artist"} onClick={startPlaylist}>Play</button>
                </div>
            </div>
        </div>
        <div className={"artist_music"}>
            <div className={"titles"}>
                <div>#</div>
                <div>Song</div>
                <div className={"artist_titles_time"}>Time</div>
            </div>
            <div className={"artist_song_list"}>
                {
                    artist?.songs.map((song, index) => {
                        return <PlaylistMusicItem props={song} playlist={artist.songs} index={index + 1} type={true}  isPlaylist={true} artist={true}/>
                    })
                }
            </div>
        </div>
    </div>
}

export default ArtistPage;