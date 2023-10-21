import React from "react";
import './playlist-music-item.css';

const PlaylistMusicItem = ({props}) => {
    console.log(props)
    return (
        <div className={"song_back"}>
            <div className={"song_left"}>
                <img src={props.img} alt={props.img} />
                {props.name}
            </div>
            <div className={"song_artist"}>{props.artist}</div>
            <div className={"song_time"}>{props.time}</div>
        </div>
    )
}

export default PlaylistMusicItem;