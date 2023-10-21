import React from "react";
import './content-page.css';

import ContentItem from "../utilities/content-item/content-item";

import img1 from '../../assets/music.jpg';
import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import {collection, doc, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

let playlist = [
];

const dbInstance = collection(db, 'songs');
await getDocs(dbInstance).then( (response) => {
    playlist = ([...response.docs.map( (item) => {
        return { ...item.data(), id:item.id
        }})
    ]).slice()
}).catch( (err) => { alert(err.message) }
).finally(() => {})



const ContentPage = () => {
  return (
      <div>
          <div className={"contentItemCard"}>
              <span>Recently Played</span>
              <div className={"song_list"}>
                  {
                      playlist.map((song, index) => {
                          return <PlaylistMusicItem props={song} />
                      })
                  }
                  {
                      playlist.map((song, index) => {
                          return <PlaylistMusicItem props={song} />
                      })
                  }
              </div>
          </div>
      </div>
  )
}

export default ContentPage;