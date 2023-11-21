import React, {useContext, useEffect, useState} from "react";
import './content-page.css';

import {Link, useNavigate, useOutletContext} from "react-router-dom";
import { userUID } from "../services/user-service";

import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";

import { getUserPlaylist } from "../services/playlist-service";
import { getSongs } from "../services/song-service";

import playlistDefault from "../../assets/playlistdefault.jpg";

import { changesSongs } from "../home-page/home-page";


let playlistList = [];

if(userUID) {
    await getUserPlaylist((JSON)
        .parse(localStorage.getItem('user')).uid)
        .then((result) => {
                playlistList = result;
            }
        );
}

let playlist = [];

await getSongs()
  .then((result) => {
      playlist = result;
  }
)


const ContentPage = () => {

  const [state, setState] = useState(false);

  return <div className={"content_page_back"}>
    <div className={"content_item_back"}>
      <span className={"content_title"}>Recently Played</span>
        <div className={"recently_list"}>
          {
              playlistList.map((playlist, index) => {
                  return <Link to={`/home/playlists/${playlist.name}`} className={"playlist_item"}
                               state={{
                                   userID: (JSON).parse(localStorage.getItem('user')).uid,
                                   playlistIndex: index
                               }}>
                      { <img src={!playlist.img ? playlistDefault : playlist.img} alt={playlist.name} />}
                      <span>{playlist.name}</span>
                  </Link>
              })
          }
      </div>
    </div>
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