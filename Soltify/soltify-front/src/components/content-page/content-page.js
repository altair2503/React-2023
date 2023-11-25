import React, {useEffect, useState} from "react";
import './content-page.css';

import {Link, useOutletContext} from "react-router-dom";

import { getSongs } from "../services/song-service";

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import playlistDefault from "../../assets/playlistdefault.jpg";


const ContentPage = () => {
    const [topSongs, setTopSongs] = useState([]);
    const {user} = useOutletContext();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await getSongs()
                    .then((result) => {
                            setTopSongs(result);
                        }
                    )
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return <div className={"content_page_back"}>
        {
            user.playlist?.length > 1
            ?
                <div className={"content_item_back"}>
                    <span className={"content_title"}>Recently Played</span>
                    {
                        <div className={"recently_list"}>
                            {
                                user.playlist?.map((userPL, index) => {
                                    return index !== 0 ? <Link
                                        to={`/home/playlists/${index}`}
                                        className={"recently_item"}
                                        state={{
                                            userID: (JSON).parse(localStorage.getItem('user')).uid,
                                            playlistIndex: index
                                    }}>
                                        { <img src={!userPL.img ? playlistDefault : userPL.img} alt={userPL.name} />}
                                        <span>{userPL.name}</span>
                                    </Link> : ""
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
                    topSongs?.map((song, index) => {
                        return <PlaylistMusicItem props={song} index={index} isPlaylist={true} playlist={topSongs} user={user} />
                    })
                }
            </div>
        </div>
    </div>
}

export default ContentPage;