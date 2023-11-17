import React, {useContext, useEffect, useState} from "react";
import './content-page.css';
import Player from "../player/player";

import ContentItem from "../utilities/content-item/content-item";

import img1 from '../../assets/music.jpg';
import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";


import {Link, useNavigate, useOutletContext} from "react-router-dom";
import playlistLogo2 from "../../assets/music/5.jpeg";
import playlistLogo from "../../assets/music.jpg";
import playlistLogo3 from "../../assets/music/3.jpeg";
import playlistLogo4 from "../../assets/music/50 cent 2.jpeg";
import { getSongs } from "../services/song-service";
import { changesSongs } from "../home-page/home-page";


let playlist = [];

await getSongs()
  .then((result) => {
    playlist = result;
  })


const ContentPage = () => {
  const {setPlaylist} = useOutletContext();
  const {setIndex} = useOutletContext();
  const [state, setState] = useState(false);

  const selectSong = (songs, index)=> {
    setPlaylist(songs);
    setIndex(index);
  }

  return <div className={"content_page_back"}>
    <div className={"content_item_back"}>
      <span className={"content_title"}>Recently Played</span>
      <div className={"recently_list"}>
        <Link to={""} className={"playlist_item"}>
          {
            state ? <div className={"playlist_img"}>
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div> : <img src={playlistLogo} alt={playlistLogo} />
          }
          <span>aǵylshynsha olender</span>
        </Link>
        <Link to={"/home/playlists/oryssha-olender"} className={"playlist_item"}>
          {
            state ? <div className={"playlist_img"}>
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div> : <img src={playlistLogo2} alt={playlistLogo} />
          }
          <span>oryssha olender</span>
        </Link>
        <Link to={""} className={"playlist_item"}>
          {
            !state ? <div className={"playlist_img"}>
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div> : <img src={playlistLogo} alt={playlistLogo} />
          }
          <span>uiqy ushin</span>
        </Link>
        <Link to={""} className={"playlist_item"}>
          {
            state ? <div className={"playlist_img"}>
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div> : <img src={playlistLogo3} alt={playlistLogo} />
          }
          <span>sport ushin</span>
        </Link>
        <Link to={""} className={"playlist_item"}>
          {
            state ? <div className={"playlist_img"}>
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div> : <img src={playlistLogo4} alt={playlistLogo} />
          }
          <span>music in car</span>
        </Link>
        <Link to={""} className={"playlist_item"}>
          {
            state ? <div className={"playlist_img"}>
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div> : <img src={playlistLogo3} alt={playlistLogo} />
          }
          <span>sport ushin</span>
        </Link>
        <Link to={""} className={"playlist_item"}>
          {
            state ? <div className={"playlist_img"}>
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div> : <img src={playlistLogo4} alt={playlistLogo} />
          }
          <span>music in car</span>
        </Link>
      </div>
    </div>
    <div className={"content_item_back"}>
      <span className={"content_title"}>Top Charts</span>
      <div className={"content_description"}>Tracks that are the most popular on the Soltify platform at the moment</div>
      <div className={"song_list"}>
        {
          playlist.map((song, index) => {
            return (
              <div>
                <button onClick={() => selectSong(playlist, index)}>Select Song</button>
                <PlaylistMusicItem props={song} playlist={playlist} />
              </div>
            ) 
          })
        }
      </div>
    </div>
  </div>
}

export default ContentPage;