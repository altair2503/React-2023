import React, { useEffect, useMemo, useState } from "react";
import './account-page.css';


import {useNavigate, useOutletContext} from "react-router-dom";
import {signOut} from "firebase/auth";

import defaultAvatar from "../../assets/defaultAvatar.jpg";
import {auth, db} from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {becomeArtist, userUID} from "../services/user-service";

const AccountPage = () => {
    const navigate = useNavigate();
    const [updateAccPopupState, setUpdateAccPopupState] = useState(false);
    const {user} = useOutletContext();
    const [updatedUser, setUpdatedUser] = useState({...user});
    const [userIMG, setUserIMG] = useState("");
    const [username, setUsername] = useState("");
    const [imgSource, setImgSource] = useState(user.img);
    const storage = getStorage()

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
            });
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
        becomeArtist(userUID, updatedUser.username).then(() => {
            window.alert("You become artist");
        })
    }

    useEffect(() => {
        document.addEventListener("click", e => {
            if(e.target.className === "delete_popup_back") {
                setUpdateAccPopupState(false);
            }
        })
        console.log(user.username);
    }, [])

    return <div className={"acc_back"}>
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
        <span className={"acc_title"}>Your Account</span>
        <div className={"user_info"}>
            <div className={"user_info_left"}>
                <img src={user?.img !== "" ? user.img : defaultAvatar} alt={defaultAvatar} />
                <button onClick={Logout} className={"log_out_btn"}>Log out</button>
            </div>
            <div className={"user_info_right"}>
                <div className={"user_name"}>{user.name} {user.lastname}</div>
                <div className={"user_email"}>{user.email}</div>
                <div className={"user_reg_date"}>part of Soltify since {user.formattedDate} </div>
                {
                    user.username === undefined ?
                        (<div>
                            <input type="text" placeholder={"Enter username"} onChange={e => setUpdatedUser({...updatedUser, "username": e.target.value})}/>
                            <button onClick={changeStatus}>Become user</button>
                        </div>
                        )
                    : "You're already artist"
                }


            </div>
            <div className={"update_account"} onClick={() => setUpdateAccPopupState(true)}>
                Update <ion-icon name="create-outline"></ion-icon>
            </div>
        </div>
    </div>
}

export default AccountPage;