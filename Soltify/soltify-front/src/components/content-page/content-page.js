import React from "react";
import './content-page.css';

import { Link } from "react-router-dom";
import { userUID } from "../services/user-service";

import { getUserPlaylist } from "../services/playlist-service";
import { getSongs } from "../services/song-service";

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import playlistDefault from "../../assets/playlistdefault.jpg";


let playlistList = [];
if(userUID) await getUserPlaylist((JSON).parse(localStorage.getItem('user')).uid).then((result) => { playlistList = result });

let playlist = [];
await getSongs().then((result) => { playlist = result })


const ContentPage = () => {
    return <div className={"content_page_back"}>
        {
            playlistList.length > 0
            ?
                <div className={"content_item_back"}>
                    <span className={"content_title"}>Recently Played</span>
                    {
                        <div className={"recently_list"}>
                            {
                                playlistList.map((playlist, index) => {
                                    return index !== 0 ?<Link
                                        to={`/home/playlists/${playlist.name}`}
                                        className={"recently_item"}
                                        state={{
                                            userID: (JSON).parse(localStorage.getItem('user')).uid,
                                            playlistIndex: index
                                    }}>
                                        { <img src={!playlist.img ? playlistDefault : playlist.img} alt={playlist.name} />}
                                        <span>{playlist.name}</span>
                                    </Link> : ''
                                })
                            }
                        </div>
                    }
                </div>
            :
                ''
        }
        <div className={"content_item_back"}>
            <span className={"content_title"}>Top Charts</span>
            <div className={"content_description"}>Tracks that are the most popular on the Soltify platform at the moment</div>
            <div className={"song_list"}>
                {
                    playlist.map((song, index) => {
                        return <PlaylistMusicItem props={song} index={index + 1} isPlaylist={true} playlist={playlist} />
                    })
                }
            </div>
        </div>
    </div>
}

export default ContentPage;