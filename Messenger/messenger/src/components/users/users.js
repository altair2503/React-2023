import React, {useEffect, useState} from "react";
import './users.css';

import { getUserData, userUID } from "../../service/user-service";
import {collection, addDoc, onSnapshot, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";

import defaultUserImg from '../../assets/defaultUserImg.jpg'


let currentUser = "";
if(localStorage.getItem('user')) currentUser = await getUserData(userUID);


const Users = () => {

    const [popupActive, setPopupActive] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                onSnapshot(collection(db, "users"), (querySnapshot) => {
                    const result = querySnapshot.docs.map(doc => doc.data());
                    setUsers(result);
                });
            }
            catch(error) {
                console.error("Error fetching users data:", error);
            }
        }
        fetchUsersData().then()
    }, [])

    async function createChat(e, currentUser, otherUser) {
        e.preventDefault();

        await updateDoc(doc(db, "users", currentUser.id), {
            userChats: arrayUnion(otherUser.id)
        })
        await updateDoc(doc(db, "users", otherUser.id), {
            userChats: arrayUnion(currentUser.id)
        })

        await addDoc(collection(db, "chats"), {
            userIds: [currentUser.id, otherUser.id],
            users: [currentUser.username, otherUser.username]
        }).then(() => {
            setPopupActive(true)
            setTimeout(() => {
                setPopupActive(false)
            }, 1500)
        })
    }

    return <div className={"users_background"}>
        <div className={"title"}>Messenger Users</div>
        {
            popupActive
            ?
                <div className={"created_popup"}>
                    <div className={"popup"}>
                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                        <span>New chat was created</span>
                    </div>
                </div>
            :
                ''
        }
        <div className={"users_list"}>
            {
                users.map((user, index) => {
                    return (user.id !== userUID && !currentUser.userChats.includes(user.id)) ? <div className={"user_card"}>
                        <img src={defaultUserImg} alt={defaultUserImg} />
                        <div className={"card_username"}>{user.username}</div>
                        <button onClick={(e) => createChat(e, currentUser, user)}>Start chat</button>
                    </div> : ''
                })
            }
        </div>
    </div>

}

export default Users;