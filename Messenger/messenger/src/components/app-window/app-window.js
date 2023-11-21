import React, {useEffect, useState} from "react";
import './app-window.css';

import { Outlet, useLocation, useNavigate} from "react-router-dom";

import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import logo from '../../assets/logo.png'
import defaultUserImg from '../../assets/defaultUserImg.jpg'


let user = "";
if(localStorage.getItem('user')) {
    const getUserData = async() => {
        const docRef = doc(db, "users", (JSON).parse(localStorage.getItem('user')).uid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists) user = ({...docSnap.data()});
        else console.log("No such document");
    }
    await getUserData();
}


const AppWindow = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [activeMessenger, setActiveMessenger] = useState(true);
    const [activeUsers, setActiveUsers] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem("user")) {
            navigate("/log-in"); return
        }
        changeActiveLink();
    }, [location, navigate])

    const changeActiveLink = () => {
        if(location.pathname === "/") {
            setActiveMessenger(true);
            setActiveUsers(false);
        }
        else if(location.pathname === "/users") {
            setActiveMessenger(false);
            setActiveUsers(true);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('chatId');
            navigate("/log-in");
        }
        catch(error) {
            console.log(error)
        }
    }

    return <div className={"background"}>
        <div className={"app_background"}>
            <div className={"app"}>
                <div className={"nav_bar"}>
                    <img src={logo} alt={logo} />
                    <div className={"app_links"}>
                        <a href={"/"} className={activeMessenger ? "link active" : "link"}>
                            <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                        </a>
                        <a href={"/users"} className={activeUsers ? "link active" : "link"}>
                            <ion-icon name="people-outline"></ion-icon>
                        </a>
                    </div>
                    <div className={"user_side"}>
                        <img src={defaultUserImg} alt={defaultUserImg} />
                        <ion-icon name="log-out-outline" id={"log_out_btn"} onClick={logOut}></ion-icon>
                    </div>
                </div>
                <Outlet context={(user)}/>
            </div>
        </div>
    </div>

}

export default AppWindow;