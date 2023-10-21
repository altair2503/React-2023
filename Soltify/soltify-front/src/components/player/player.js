import React, {useEffect, useRef, useState} from "react";
import './player.css';

import animals from "../../assets/music/1.mp3"
import river from "../../assets/music/2.mp3"
import end from "../../assets/music/3.mp3"
import babymama from "../../assets/music/4.mp3"
import brend from "../../assets/music/5.mp3"

import songImg from '../../assets/music.jpg';

let playlist = [
    {
        id: 1,
        name: "Животные",
        artist: "Скриптонит",
        url: animals
    },
    {
        id: 2,
        name: "У реки два берега",
        artist: "Скриптонит",
        url: river
    },
    {
        id: 3,
        name: "До конца",
        artist: "Скриптонит",
        url: end
    },
    {
        id: 4,
        name: "Бэби мама",
        artist: "Скриптонит",
        url: babymama
    },
    {
        id: 5,
        name: "Мультибрендовый",
        artist: "Скриптонит",
        url: brend
    },
];

let prevPlaylist = playlist.slice();

const Player = () => {

    const [playerActive, setPlayerActive] = useState(false);

    const audioPlayer = useRef()

    const [index, setIndex] = useState(0);
    const [currentSong] = useState(playlist[index].url);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [mute, setMute] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [mixed, setMixed] = useState(false);

    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    const [progress, setProgress] = useState(0);

    const progressRef = useRef();

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

    }, [
        volume, isPlaying
    ]);

    const getCurrentDuration = () => {
        const currentProgress = (audioPlayer.current?.currentTime / audioPlayer.current?.duration) * 100;
        setProgress(currentProgress);

        document.querySelector(".progress_bar").style.width = `${progress}%`;
    }

    function progressMoving(e) {
        // const progressWidth = progressRef.current.getBoundingClientRect().width;
        // const percent = (progressWidth / 100) * progress
        //
        // document.querySelector(".progress_bar").style.width = `${percent}%`;
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
        } else {
          playlist = [...playlist.slice(0, index+1), ...prevPlaylist.slice(index+1, prevPlaylist.length)]
          setMixed(false)
        }
        shuffleArray().then((res) => {
            playlist = [...playlist.slice(0, index+1), ...res]
        })
    }

    useEffect(()=> {
        if(elapsed && elapsed === duration){
            if(repeat){
                setElapsed(0)
                audioPlayer.current.play()
            } else toggleSkipForward()
        }
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

    const findSong = (song)=>{
      return playlist.find((song) => song.url === song)
    }

    return (
        <div className={!playerActive ? "player_background mini" : "player_background"}>
            <div className="player_background_layer">
                <audio src={currentSong} ref={audioPlayer} muted={mute} onTimeUpdate={getCurrentDuration}/>
                <div className="close" onClick={() => playerActiveCondition(false)}>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <div className="song_img" onClick={() => playerActiveCondition(true)} onMouseMove={(event) => changeImageCursor(event)}>
                    <img src={songImg} alt={songImg} />
                </div>
                <div className="player_controllers">
                    <div className="song_details">
                        <div className="name">{playlist[index].name}</div>
                        <div className="artist">{playlist[index].artist}</div>
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
                            <ion-icon name="shuffle-outline" class="random" onClick={toggleMix}></ion-icon>
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
                        <div>
                            <ion-icon name="ellipsis-horizontal"></ion-icon>

                        </div>
                        <ion-icon name="scan-outline" onClick={() => playerActiveCondition(true)}></ion-icon>
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