import React, { useEffect, useMemo, useState } from "react";
import './account-page.css';

import userImg from '../../assets/music.jpg';

import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth, db} from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import avatar from "../../assets/avatar.png";
import user from "../../assets/music.jpg";
import likedPlaylist from "../../assets/likedplaylist.jpg";
import playlistDefault from "../../assets/playlistdefault.jpg";


const AccountPage = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const [updateAccPopupState, setUpdateAccPopupState] = useState(false);

    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "delete_popup_back") {
                setUpdateAccPopupState(false);
            }
        })
    }, [])

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

    const getUserData = async()=>{
        const docRef = doc(db, "users", (JSON).parse(localStorage.getItem('user')).uid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists){
            setUser(docSnap.data());
        } else {
            console.log("No such document");
        }
    }
    getUserData().then();

    return <div className={"acc_back"}>
        {
            updateAccPopupState
            ?
                <div className={"delete_popup_back"}>
                    <div className={"delete_popup update acc"}>
                        <ion-icon name="close-outline" onClick={() => setUpdateAccPopupState(false)}></ion-icon>
                        <span>Update Account</span>
                        <div className={"account_img_update"}>
                            <input type="file" id={"img_for_account"}/>
                            <img src={userImg} alt={playlistDefault}/>
                            <label htmlFor="img_for_account"></label>
                        </div>
                        <div className={"input_block"}>
                            <input name="lastname" type="text" placeholder={"Enter first name"} />
                        </div>
                        <div className={"input_block"}>
                            <input name="lastname" type="text" placeholder={"Enter last name"} />
                        </div>
                        <div className={"input_block"}>
                            <input name="lastname" type="email" placeholder={"Enter email"} />
                        </div>
                        <div className={"decision_btns"}>
                            <button>Change</button>
                        </div>
                    </div>
                </div>
            :
                ''
        }
        <span className={"acc_title"}>Your Account</span>
        <div className={"user_info"}>
            <div className={"user_info_left"}>
                { localStorage.getItem("user") == null ? <div className="default_img"><img src={avatar} alt={avatar} /></div> : <img src={userImg} alt={userImg} /> }
                <button onClick={Logout} className={"log_out_btn"}>Log out</button>
            </div>
            <div className={"user_info_right"}>
                <div className={"user_name"}>{user.name} {user.lastname}</div>
                <div className={"user_email"}>{user.email}</div>
                <div className={"user_reg_date"}>part of Soltify since 18.10.2023</div>
            </div>
            <div className={"update_account"} onClick={() => setUpdateAccPopupState(true)}>
                Update <ion-icon name="create-outline"></ion-icon>
            </div>
        </div>
    </div>
}

export default AccountPage;