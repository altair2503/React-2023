import React, { useEffect, useMemo, useState } from "react";
import './account-page.css';

import userImg from '../../assets/music.jpg';

import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth, db} from "../../firebase";
import { doc, getDoc } from "firebase/firestore";





const AccountPage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    const Logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/welcome");
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

    getUserData();

    return (<div className={"acc_back"}>
        <span className={"acc_title"}>Your Account</span>
        <div className={"user_info"}>
            <div className={"user_info_left"}>
                <img src={userImg} alt={userImg} />
                <button onClick={Logout} className={"log_out_btn"}>Log out</button>
            </div>
            <div className={"user_info_right"}>
                <div className={"user_name"}>{user.name} {user.lastname}</div>
                <div className={"user_email"}>{user.email}</div>
                <div className={"user_reg_date"}>part of Soltify since 18.10.2023</div>
            </div>
        </div>
    </div>)
}

export default AccountPage;