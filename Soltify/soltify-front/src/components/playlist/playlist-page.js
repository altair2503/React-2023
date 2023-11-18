import React, { useEffect, useState } from "react";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import './playlist-page.css';
import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import { getUserExactPlaylist } from "../services/playlist-service";
import { getUserData } from "../services/user-service";
import { getPlaylistSongs } from "../services/song-service";



const PlaylistPage = () => {
    const location = useLocation();
    const {playlistName} = useParams();
    const [playlist, setPlaylist1] = useState({songs: []});
    const [songs, setSongs] = useState([]);
    const [owner, setOwner] = useState("");
    const {setPlaylist} = useOutletContext();
    const {setIndex} = useOutletContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playlistResult = await getUserExactPlaylist(location.state.userID, location.state.playlistIndex);
                console.log("getUserExactPlaylist");
                setPlaylist1(playlistResult);

                const songsResult = await getPlaylistSongs(playlistResult.songs);
                setSongs(songsResult);
                console.log(songs);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [location.state.userID, location.state.playlistIndex]);

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const ownerResult = await getUserData(location.state.userID);
                setOwner(ownerResult);
            } catch (error) {
                console.error("Error fetching owner data:", error);
            }
        };

        fetchOwnerData();
    }, [location.state.userID]);
    
    
    const selectSong = (songs, index)=> {
        setPlaylist(songs);
        setIndex(index);
        }

    useEffect(() => {
        console.log("helolo from useEffect")
    }, [playlist, owner, songs])

    return (
        <div className={"playlist_background"}>
            <div className={"playlist_info"}>
                <div className={"playlist_img"}>
                    {
                        !playlist.img ? <div className={"playlist_img"}>
                            <ion-icon name="musical-notes-outline"></ion-icon>
                        </div> : <img src={playlist.img} alt={playlist.name} />
                    }
                </div>
                <div className={"playlist_details"}>
                    <span>Playlist</span>
                    <div className={"playlist_name"}>{playlistName}</div>
                    <div className={"playlist_owner"}> {owner ? `${owner.name} ${owner.lastname}` : ""} <span>•</span> {playlist.songs.length} songs</div>
                    <button className={"play_playlist"}>Play</button>
                </div>
                {/*<div className={"playlist_options"}>*/}
                {/*    <ion-icon name="create-outline"></ion-icon>*/}
                {/*    <ion-icon name="trash-outline"></ion-icon>*/}
                {/*</div>*/}
            </div>
            <div className={"playlist_music"}>
                <div className={"titles"}>
                    <div>Song</div>
                    <div>Artist</div>
                    <div>Time</div>
                </div>
                <div className={"playlist_song_list"}>
                    {
                        songs.map((song, index) => {
                            return (
                            <div>
                                <button onClick={() => selectSong(songs, index)}>Select Song</button>
                                <PlaylistMusicItem props={song} type={true}/>
                            </div> 
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage;