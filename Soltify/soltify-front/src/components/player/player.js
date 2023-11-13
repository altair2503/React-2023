import React, {useEffect, useRef, useState} from "react";
import './player.css';
// import { db } from "../../firebase";
// import {doc, getDoc, getDocs, collection, onSnapshot } from "firebase/firestore";

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

import {Link, useNavigate} from "react-router-dom";

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
  {
    name: "Riders in the storm",
    artist: "Snoop doog",
    url: snoop,
    img: snoopimg
  },
];

// const dbInstance = collection(db, 'songs');
// await getDocs(dbInstance).then( (response) => {
//   playlist = ([...response.docs.map( (item) => {
//     return { ...item.data(), id:item.id
//     }})
//   ]).slice()
//   }).catch( (err) => { alert(err.message) }
// ).finally( () => {
// })

let prevPlaylist = playlist.slice();

const Player = () => {

    const [playerActive, setPlayerActive] = useState(false);
    const [artist, setArtist] = useState("")

    const audioPlayer = useRef()

    const [index, setIndex] = useState(0);
    const [currentSong] = useState(playlist[index].url);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [mute, setMute] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [mixed, setMixed] = useState(false);

    const [playlistAddState, setPlaylistAddState] = useState(false);

    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    const [progress, setProgress] = useState(0);

    const progressRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("playerCondition") === "true") {
            setPlayerActive(true)
        } else setPlayerActive(false)

        if(audioPlayer) audioPlayer.current.volume = volume / 100;

        setInterval(() => {
            const _duration = Math.floor(audioPlayer?.current?.duration);
            const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

            setDuration(_duration);
            setElapsed(_elapsed);
        }, 100);

        document.addEventListener("click", e => {
            if(e.target.id !== "add_to_playlist_btn") {
                setPlaylistAddState(false)
            }
        })

    }, [volume, isPlaying]);

    const getCurrentDuration = () => {
        const currentProgress = (audioPlayer.current?.currentTime / audioPlayer.current?.duration) * 100;
        setProgress(currentProgress);

        document.querySelector(".progress_bar").style.width = `${progress}%`;
    }

    function progressMoving(e) {
    }

    function changeCurrent(e) {
        let progressWidth = e.target.clientWidth;
        let clickedOffSetX = e.nativeEvent.offsetX;

        audioPlayer.current.currentTime = (clickedOffSetX / progressWidth) * duration;

        const currentProgress = (audioPlayer.current?.currentTime / audioPlayer.current?.duration) * 100;
        setProgress(currentProgress);

        document.querySelector(".progress_bar").style.width = `${progress}%`;

        if(!isPlaying) {
            audioPlayer.current.play();
            setIsPlaying(true);
        }
    }

    function changeVolume(e) {
        let progressWidth = e.target.clientWidth;
        let clickedOffSetX = e.nativeEvent.offsetX;
        let volumeValue = Math.round((clickedOffSetX / progressWidth) * 100);

        document.querySelector(".volume_progress_bar").style.width = `${volumeValue}%`;
        setVolume(volumeValue);
    }

    function formatTime(time) {
        if(time && !isNaN(time)){
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

            return `${minutes}:${seconds}`;
        }
        return '0:00';
    }

    const togglePlay = () => {
        if(!isPlaying) audioPlayer.current.play()
        else audioPlayer.current.pause()

        setIsPlaying(prev => !prev)
        // getArtist(playlist[index].artistID)
    }

    const toggleSkipForward = () => {
        if(index >= playlist.length - 1) {
            setIndex(0);
            audioPlayer.current.src = playlist[0].url;
            audioPlayer.current.play();
        } else {
            setIndex(prev => prev + 1);
            audioPlayer.current.src = playlist[index + 1].url;
            audioPlayer.current.play();
        }
        if(!isPlaying){
            setIsPlaying(true)
        }
        // getArtist(playlist[index].artistID)
    }

    const toggleSkipBackward = () => {
        if(index > 0) {
            setIndex(prev => prev - 1);
            audioPlayer.current.src = playlist[index - 1].url;
            audioPlayer.current.play();
        } else {
            setIndex(prev => playlist.length - 1);
            audioPlayer.current.src = playlist[playlist.length-1].url;
            audioPlayer.current.play();
        }
        if(!isPlaying){
            setIsPlaying(true)
        }
        // getArtist(playlist[index].artistID)
    }

    const toggleReply = () => {
        if(!repeat) {
            setRepeat(true)
            document.querySelector(".repeat").classList.add("on");
        } else {
            setRepeat(false)
            document.querySelector(".repeat").classList.remove("on");
        }
    }

    const toggleMix = () => {
      console.log(mixed, ...playlist)
        if(mixed === false){
          let shuffledArray = playlist.slice(index + 1);
          let shuffleArray =  async() => {
              let array = shuffledArray.slice();
              for (let i = array.length - 1; i > 0; i--) {
                  let j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
              }
              return array
          }
          shuffleArray().then((res) => {
              playlist = [...playlist.slice(0, index+1), ...res]
          })
          setMixed(true)
            shuffleArray().then((res) => {
                playlist = [...playlist.slice(0, index+1), ...res]
            })
            setMixed(true)
        } else {
          playlist = [...playlist.slice(0, index+1), ...prevPlaylist.slice(index+1, prevPlaylist.length)]
          setMixed(false)
        }
    }

    useEffect(()=> {
        if(elapsed && elapsed === duration){
            if(repeat){
                setElapsed(0)
                audioPlayer.current.play()
            } else toggleSkipForward()
        }
        // getArtist(playlist[index].artistID)
    }, [elapsed]);

    function changeImageCursor(event) {
        event.target.offsetWidth < 400 ? event.target.style.cursor = 'pointer' : event.target.style.cursor = 'default'
    }

    function playerActiveCondition(condition) {
        if(condition) {
            setPlayerActive(true)
            localStorage.setItem("playerCondition", "true")
        }
        else {
            setPlayerActive(false)
            localStorage.setItem("playerCondition", "false")
        }
    }

    const findSong = (song)=> {
      return playlist.find((song) => song.url === song)
    }


    // const getArtist = (uid) => {
    //   const colUsers = collection(db, "users");
    //   const docRef = doc(colUsers, uid);
    //   onSnapshot(docRef, (doc) => { // @ts-ignore
    //     console.log(doc.data())
    //     console.log(doc.data()['username'])
    //     setArtist(doc.data()['username'])
    //   });
    // }

    return (
        <div className={!playerActive ? "player_background mini" : "player_background"} onClick={() => localStorage.getItem("user") == null ? navigate('/log-in') : ''}>
            <img src={playlist[index].img} alt={playlist[index].img} className={"player_background_img"} />
            <div className="player_background_layer">
                <audio src={currentSong} ref={audioPlayer} muted={mute} onTimeUpdate={getCurrentDuration}/>
                <div className="close" onClick={() => playerActiveCondition(false)}>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <div className="song_img" onClick={() => playerActiveCondition(true)} onMouseMove={(event) => changeImageCursor(event)}>
                    <img src={playlist[index].img} alt={playlist[index].img} />
                </div>
                <div className="player_controllers">
                    <div className="song_details">
                        <div className="name">{playlist[index].name}</div>
                        <div className="artist"> {playlist[index].artist}</div>
                    </div>
                    <div className="song_center">
                        <div className="song_progress" ref={progressRef} onMouseMove={(e) => progressMoving(e)} onMouseDown={(e) => changeCurrent(e)}>
                            <div className="progress_bar"></div>
                            <div className="timer">
                                <span className="current">{formatTime(elapsed)}</span>
                                <span className="duration">{formatTime(duration)}</span>
                            </div>
                        </div>
                        <div className="player_navigation">
                            <ion-icon name="shuffle-outline" class="random" onClick={toggleMix} style={mixed ? { color: "#25dc60" } : { color: "#efefef" }}></ion-icon>
                            <div className="center">
                                <ion-icon name="play-skip-back-outline" onClick={toggleSkipBackward}></ion-icon>
                                <div className="play_pause" onClick={togglePlay}>
                                    { !isPlaying ? <ion-icon name="play" id="play"></ion-icon> : <ion-icon name="pause-outline" id="pause"></ion-icon> }
                                </div>
                                <ion-icon name="play-skip-forward-outline" onClick={toggleSkipForward}></ion-icon>
                            </div>
                            <ion-icon name="repeat-outline" class="repeat" onClick={toggleReply}></ion-icon>
                        </div>
                    </div>
                    <div className="player_options">
                        <ion-icon name="heart" id="heart"></ion-icon>
                        <div className={"add_to_playlist_btn"}>
                            <ion-icon name="add-outline" id={"add_to_playlist_btn"} onClick={() => setPlaylistAddState(playlistAddState => !playlistAddState)}></ion-icon>
                            {
                                playlistAddState ? <div className="list_to_add">
                                    <span>Add to playlist:</span>
                                    <ul>
                                        <li><span>qazaqsha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                        <li><span>aǵylshynsha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                        <li><span>oryssha olender <ion-icon name="add-outline"></ion-icon></span></li>
                                        <li><span>uiqy ushin <ion-icon name="add-outline"></ion-icon></span></li>
                                        <li><span>sport ushin <ion-icon name="add-outline"></ion-icon></span></li>
                                        <li><span>music in car <ion-icon name="add-outline"></ion-icon></span></li>
                                        <li><span>for cooking <ion-icon name="add-outline"></ion-icon></span></li>
                                    </ul>
                                </div> : ''
                            }
                        </div>
                        <ion-icon name="scan-outline" id="scan" onClick={() => playerActiveCondition(true)}></ion-icon>
                    </div>
                    <div className="song_volume">
                        <ion-icon name="volume-off-outline"></ion-icon>
                        <div className="volume_progress" onMouseDown={(e) => changeVolume(e)}>
                            <div className="volume_progress_bar"></div>
                        </div>
                        <ion-icon name="volume-high-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player;