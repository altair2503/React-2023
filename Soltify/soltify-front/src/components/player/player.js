import { useEffect, useState } from "react";
import useSound from "use-sound";
import music from "../../assets/music/2.mp3"



const  Player = ()=> {
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState({
        min: "",
        sec: ""
    });
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: ""
    });
    const [seconds, setSeconds] = useState()

    const [play, { pause, duration, sound}] = useSound(music)

    
    useEffect(() => {
        const sec = duration / 100;
        const min = Math.floor(sec / 600);
        const secRemain = Math.floor(sec % 60);
        setTime({
            min: min,
            sec: secRemain
        });
    }, [isPlaying])
    
    useEffect(() => {
        const interval = setInterval(() => {
            if(sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min, 
                    sec,
                });
            }
        }, 1)
        return ()=> clearInterval(interval)
    }, [sound]);
    
    const playingButton = ()=> {
    if(isPlaying){
        pause();
        setIsPlaying(false);
        } else{
            play();
            setIsPlaying(true);
        }
    }
    
    return (
    <div className="component">
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div>
        <button className="playButton">
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            play
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            pause
          </button>
        )}
        <button className="playButton">
        </button>
      </div>
    </div>
  );
}

export default Player;

// import React from "react";
// import styles from './player.module.css'

// const Player = () => {
//   return (
//       <div className={styles.background}>
//           <div className={styles.background_layer}>

//           </div>
//       </div>
//   )
// }

// export default Player;