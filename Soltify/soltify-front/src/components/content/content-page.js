import React, { useContext, useEffect } from "react";
import './content-page.css';

import ContentItem from "../utilities/content-item/content-item";

import img1 from '../../assets/music.jpg';
import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import {collection, doc, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

import animals from "../../assets/music/1.mp3"
import river from "../../assets/music/2.mp3"
import end from "../../assets/music/3.mp3"
import babymama from "../../assets/music/4.mp3"
import brend from "../../assets/music/5.mp3"
import raim1 from "../../assets/music/RaiM1.mp3"
import dar1 from "../../assets/music/dar1.mp3"
import dar2 from "../../assets/music/dar2.mp3"
import dar3 from "../../assets/music/dar3.mp3"
import ice1 from "../../assets/music/ice1.mp3"
import ice2 from "../../assets/music/ice2.mp3"
import snoop from "../../assets/music/snoop.mp3"

import animalsImg from '../../assets/music/1.png';
import riverImg from '../../assets/music/2.webp';
import endImg from '../../assets/music/3.jpeg';
import babymamImg from '../../assets/music/4.jpeg';
import brendImg from '../../assets/music/5.jpeg';
import raim1img from '../../assets/music/Dosym Raim.jpeg';
import dar1img from '../../assets/music/uide.jpeg';
import dar2img from '../../assets/music/kun men ayim.jpeg';
import dar3img from '../../assets/music/shyrailym.jpeg';
import ice1img from "../../assets/music/ice cube.jpeg"
import ice2img from "../../assets/music/ice cube 2.jpeg"
import snoopimg from "../../assets/music/snoop dog.jpeg"

import {useNavigate} from "react-router-dom";

let playlist = [
  {
    name: "Животные",
    artist: "Скриптонит",
    url: animals,
    img: animalsImg
  }, 
  {
    name: "Не верь слезам",
    artist: "Скриптонит",
    url: river,
    img: riverImg
  }, 
  {
    name: "До конца",
    artist: "Скриптонит",
    url: end,
    img: endImg
  }, 
  {
    name: "Мультибрендовый",
    artist: "Скриптонит",
    url: brend,
    img: brendImg
  }, 
  {
    name: "Baby mama",
    artist: "Скриптонит",
    url: babymama,
    img: babymamImg
  }, 
  {
    name: "Досым",
    artist: "Раим",
    url: raim1,
    img: raim1img
  }, 
//   {
//     name: "Ана",
//     artist: "Раим",
//     url: raim2,
//     img: raim2img
//   },
//   {
//     name: "Oh My Love",
//     artist: "Раим",
//     url: raim3,
//     img: raim3img
//   },
  {
    name: "Yuide",
    artist: "Darkhan Juzz",
    url: dar1,
    img: dar1img
  },
  {
    name:  "Күн мен Айым",
    artist: "Darkhan Juzz",
    url: dar2,
    img: dar2img
  },
  {
    name: "Shyrailym",
    artist: "Darkhan Juzz",
    url: dar3,
    img: dar3img
  },
  {
    name: "You know how to do it",
    artist: "Ice Cube",
    url: ice1,
    img: ice1img
  },
  {
    name: "It was a good day",
    artist: "Ice Cube",
    url: ice2,
    img: ice2img
  },
//   {
//     name: "Legen",
//     artist: "50 cent",
//     url: cent1,
//     img: cent1img
//   },
//   {
//     name: "Candy shop",
//     artist: "50 cent",
//     url: cent2,
//     img: cent2img
//   },
  {
    name: "Riders in the storm",
    artist: "Snoop doog",
    url: snoop,
    img: snoopimg
  },
];

// const dbInstance = collection(db, 'songs');
// await getDocs(dbInstance).then( (response) => {
//     playlist = ([...response.docs.map( (item) => {
//         return { ...item.data(), id:item.id, artist:(()=>{return "hellelelelelel"})
//         }})
//     ]).slice()
// }).catch( (err) => { alert(err.message) }
// ).then(()=>{

        
// })

// const getArtists = async()=> {
//     for(let i=0; i<playlist.length; i++){
//         const colUsers = collection(db, "users");
//         const docRef = doc(colUsers, playlist[i]['artistID']);
//         onSnapshot(docRef, (doc) => { // @ts-ignore
//           playlist[i]['artist'] = doc.data()['username']
//         });
//         console.log(playlist[i]['artist'])
//     }
// }

// await getArtists()

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