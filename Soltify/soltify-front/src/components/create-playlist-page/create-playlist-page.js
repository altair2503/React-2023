import React from "react";
import './create-playlist-page.css';
import userImg from "../../assets/music.jpg";
import Input from "../utilities/input/input";
import playlistDefault from "../../assets/playlistdefault.jpg";

const CreatePlaylistPage = () => {
    return <div>
        <span className={"acc_title"}>Create Playlist</span>
        <div className={"create_area"}>
            <div className={"playlist_ft_imf"}>
                <input type="file" id={"img_for_playlist"} />
                <img src={playlistDefault} alt={playlistDefault} />
                <label for="img_for_playlist"></label>
            </div>
            <div className={"playlist_data"}>
                <div>Fill the fields</div>
                <Input props={{name: 'Playlist name'}}/>
                <button>Create</button>
            </div>
        </div>
    </div>
}

export default CreatePlaylistPage;