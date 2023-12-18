import React, { useEffect, useMemo, useState } from "react";
import './account-page.css';

import {Link, useNavigate, useOutletContext} from "react-router-dom";

import { auth, db } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import { becomeArtist, userUID } from "../services/user-service";

import defaultAvatar from "../../assets/defaultAvatar.jpg";
import addSongIcon from '../../assets/add-song-icon.svg';
import PlaylistMusicItem from "../utilities/playlist-music-item/playlist-music-item";
import playlistDefault from "../../assets/playlistdefault.jpg";
import congratulations from "../../assets/congratulation.gif";


const AccountPage = () => {

    const {user} = useOutletContext();
    const [updatedUser, setUpdatedUser] = useState({...user});

    const [congratulationState, setCongratulationState] = useState(false);
    const [becameArtistPopupState, setBecameArtistPopupState] = useState(false);
    const [updateAccPopupState, setUpdateAccPopupState] = useState(false);

    const storage = getStorage()
    const [userIMG, setUserIMG] = useState("");
    const [username, setUsername] = useState("");
    const [imgSource, setImgSource] = useState(user.img);

    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    const selectIMG = (event)=> {
        setImgSource(event.target.files[0]);

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (event) => {
            setUserIMG(event.target.result);
            setUpdatedUser({...updatedUser, img: event.target.result})
        }

    }

    const uploadIMG = async() => {
        const storageRef = ref(storage, 'images/' + imgSource.name);
        const uploadTask = uploadBytesResumable(storageRef, imgSource);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    changeUserFirestore(downloadURL);
                });
            }
        );
    }

    const changeUser = async() => {
        if(imgSource !== user.img){
            await uploadIMG();
            return;
        }
        await changeUserFirestore(user.img);
    }

    const changeUserFirestore = async(imgURL) => {
        console.log(updatedUser);
        const userRef = doc(db, "users", (JSON).parse(localStorage.getItem('user')).uid);

        await updateDoc(userRef, {
            "name": updatedUser.name,
            "lastname": updatedUser.lastname,
            "img": imgURL
        }).then(() => {
            setUpdateAccPopupState(false);
            setUpdatedUser({...updatedUser});
        });
    };

    const changeStatus = ()=> {
        becomeArtist(userUID, updatedUser.username)
        .then(() => {
            setBecameArtistPopupState(false);
            setCongratulationState(true)
        });
    }

    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "delete_popup_back") {
                setUpdateAccPopupState(false);
            }
        })
        console.log(user.username);
    }, [])

    return <div className={ user?.username ? "acc_back_artist" : "acc_back" }>
        {
            updateAccPopupState
            ?
                <div className={"delete_popup_back"}>
                    <div className={"delete_popup update acc"}>
                        <ion-icon name="close-outline" onClick={() => setUpdateAccPopupState(false)}></ion-icon>
                        <span>Update Account</span>
                        <div className={"account_img_update"}>
                            <input type="file" id={"img_for_account"} onChange={selectIMG}/>
                            <img src={updatedUser?.img === "" ? defaultAvatar : updatedUser.img} alt={defaultAvatar}/>
                            <label htmlFor="img_for_account"></label>
                        </div>
                        <div className={"input_block"}>
                            <input name="lastname" type="text" placeholder={"Enter first name"} value={updatedUser.name} onChange={e => setUpdatedUser({...updatedUser, "name": e.target.value})}/>
                        </div>
                        <div className={"input_block"}>
                            <input name="lastname" type="text" placeholder={"Enter last name"} value={updatedUser.lastname} onChange={e => setUpdatedUser({...updatedUser, "lastname": e.target.value})}/>
                        </div>
                        <div className={"decision_btns"}>
                            <button onClick={changeUser}>Change</button>
                        </div>
                    </div>
                </div>
            :
                ''
        }
        {
            becameArtistPopupState
            ?
                <div className={"delete_popup_back"}>
                    <div className={"delete_popup update acc"}>
                        <ion-icon name="close-outline" onClick={() => setBecameArtistPopupState(false)}></ion-icon>
                        <span>Become Artist</span>
                        <div className={"input_block"} style={{marginTop: '25px'}}>
                            <input type="text" placeholder={"Enter username"} onChange={e => setUpdatedUser({...updatedUser, "username": e.target.value})} />
                        </div>
                        <div className={"decision_btns"} style={{marginTop: '30px'}}>
                            <button onClick={changeStatus}>Become</button>
                        </div>
                    </div>
                </div>
            :
                ''
        }
        <div className={ !congratulationState ? "delete_popup_back cong" : "delete_popup_back cong active" }>
            <div className={"delete_popup congratulation"}>
                <ion-icon name="close-outline" onClick={() => setCongratulationState(false)}></ion-icon>
                <img className={"first_cong"} src={congratulations} alt={congratulations} />
                <img className={"sec_cong"} src={congratulations} alt={congratulations} />
                <div>Congratulations on becoming an Artist. We are waiting for your creativity!</div>
            </div>
        </div>
        <span className={"acc_title"}>{ user?.username ? 'Your Artist Page' : 'Your Account'}</span>
        <div className={"user_info_back"}>
            { user?.username ? <img src={user?.img !== "" ? user.img : defaultAvatar} className={"artist_info_back_img"} alt={playlistDefault} style={{height: '62%'}} /> : '' }
            <div className={ user?.username ? "user_info for_artist" : "user_info"}>
                <div className={"user_info_left"}>
                    <img src={user?.img !== "" ? user.img : defaultAvatar} alt={defaultAvatar} />
                </div>
                <div className={"user_info_right"}>
                    { user?.username ? <div className={"username"}>{user?.username} • 8 songs</div> : '' }
                    <div className={"user_name"}>{user?.name} {user?.lastname}</div>
                    <div className={"user_email"} style={user?.username && window.innerWidth > 451 ? {marginBottom: '40px'} : {marginBottom: '0'}}>{user?.email}</div>
                    { user?.username ? '' : <div className={"user_reg_date"}>part of Soltify since {user?.formattedDate} </div> }
                    <div className={"account_artist_options"}>
                        <button onClick={Logout} className={"log_out_btn"}>Log out</button>
                        <div className={ window.innerWidth < 451 && user?.username ? "update_account become_artist" : "update_account"} onClick={() => setUpdateAccPopupState(true)}>
                            { window.innerWidth < 451 && user?.username ? "Update" : "" }
                            <ion-icon name="create-outline"></ion-icon>
                        </div>
                        {
                            window.innerWidth < 451 && !user?.username
                            ?
                                <div className={"update_account become_artist"} onClick={() => setBecameArtistPopupState(true)}>
                                    Become Artist <ion-icon name="person-outline"></ion-icon>
                                </div>
                            :
                                ''
                        }
                        {
                            user?.username
                            ?
                                <Link to={"/add-song"} className={"add_song_btn"}>
                                    <ion-icon name="add-outline"></ion-icon>
                                </Link>
                            :
                                ''
                        }
                    </div>
                </div>
                {
                    user?.username || window.innerWidth < 451
                    ?
                        ''
                    :
                        <div className={"update_account"} onClick={() => setBecameArtistPopupState(true)}>
                            Become Artist <ion-icon name="person-outline"></ion-icon>
                        </div>
                }
            </div>
        </div>
        {
            user?.username
            ?
                <div className={"artist_music"}>
                    <div className={"titles"}>
                        <div>#</div>
                        <div>Song</div>
                        <div className={"artist_titles_time"}>Time</div>
                    </div>
                    <div className={"artist_song_list"}>
                        {
                            // artist?.songs.map((song, index) => {
                            //     return <PlaylistMusicItem props={song} playlist={artist.songs} index={index} type={true} user={user} isPlaylist={true} artist={true} />
                            // })
                        }
                    </div>
                </div>
            :
                ''
        }
    </div>
}

export default AccountPage;