import React from "react";
import './App.css';
import { getSongs, getMusic } from "./components/services/song-service";
import { useState, useEffect } from "react";

var playlist = [];

await getSongs().then((result) => {
    playlist = result;
})


const App = ()=> {
    const [songURL, setSongURL] = useState("");

    const selectAudio = (musicID) => {
        getMusic(musicID).then((result)=> {
            setSongURL(result['url']);
        })
    }
    

    return (
        <div>
            <div>
                <audio controls src={songURL}></audio>
            </div>

            <ol>
                {playlist.map(item => (
                    <div>
                        <li key={item}>
                            {item.artist.username}: {item.name} <button style={{width: "auto"}} onClick={()=> selectAudio(item.musicID)}>select audio</button>
                        </li>
                    </div>
                    
                ))}
            </ol>
        </div>
    );
}

export default App;