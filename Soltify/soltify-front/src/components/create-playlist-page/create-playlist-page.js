import React from "react";
import './create-playlist-page.css';
import userImg from "../../assets/music.jpg";

const CreatePlaylistPage = () => {
    return <div>
        <span className={"acc_title"}>Create Playlist</span>
        <div className={"user_info"}>
            <div className={"user_info_left"}>
                <img src={userImg} alt={userImg} />
                {/*<button onClick={Logout} className={"log_out_btn"}>Log out</button>*/}
            </div>
            <div className={"user_info_right"}>
                <div className={"user_name"}>Azat Amen</div>
                <div className={"user_email"}>a_amen@kbtu.kz</div>
                <div className={"user_reg_date"}>part of Soltify since 18.10.2023</div>
            </div>
        </div>
    </div>
}

export default CreatePlaylistPage;