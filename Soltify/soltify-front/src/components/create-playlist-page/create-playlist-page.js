import React from "react";
import './create-playlist-page.css';
import userImg from "../../assets/music.jpg";
import Input from "../utilities/input/input";

const CreatePlaylistPage = () => {
    return <div>
        <span className={"acc_title"}>Create Playlist</span>
        <div className={"create_area"}>
            <div className={"playlist_ft_imf"}>
                <ion-icon name="musical-notes-outline"></ion-icon>
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