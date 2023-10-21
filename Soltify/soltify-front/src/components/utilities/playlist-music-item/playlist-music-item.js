import React from "react";
import './playlist-music-item.css';

const PlaylistMusicItem = ({props, type}) => {
    if(type) {
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
    } else {
        return (
            <div className={"song_back_min"}>
                <div className={"song_left"}>
                    <img src={props.img} alt={props.img} />
                    {props.name}
                </div>
                {/*<div className={"song_artist_min"}>{props.artist}</div>*/}
                <div className={"song_time_min"}>3:57</div>
            </div>
        )
    }
}

export default PlaylistMusicItem;