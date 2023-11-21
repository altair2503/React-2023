import React, { useEffect, useState } from "react";
import './messenger.css';

import { userUID } from "../../service/user-service";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

// import { getChats } from "../../service/messenger-service";
import Chat from "../chat/chat";

import defaultUserImg from '../../assets/defaultUserImg.jpg'

const Messenger = () => {

    const [chatItem, setChatItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('')
    const [chats, setChats] = useState([])

    useEffect(() => {
        fetchUserChats().then()
    }, [])

    const fetchUserChats = async () => {
        try {
            const ref = collection(db, "chats")
            const q = query(ref, where("userIds", "array-contains", userUID))

            let chatsList = []
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach(chat => chatsList.push({id: chat.id, ...chat.data()}))
                setChats(chatsList)
            });
        }
        catch(error) {
            console.error("Error fetching chats:", error)
        }
    }

    const searchChats = (query) => {
        const newChatsList = chats.filter(chat => {
            return chat?.userIds.indexOf(userUID) === 0 ? chat?.users[1].includes(query) : chat?.users[0].includes(query)
        })
        setChats(newChatsList)
    }
    function fillSearchInput(searchText) {
        if(searchText === "") fetchUserChats().then()
        setSearchQuery(searchText)
    }

    function chooseChat(chat) {
        localStorage.setItem("chatId", chat.id)
        setChatItem(chat)
    }

    return <div className={"messenger_background"}>
        <div className={"chats"}>
            <div className={"title"}>Chats</div>
            <div className={"search"}>
                <input type="text" value={searchQuery} placeholder={"Search..."} onChange={e => fillSearchInput(e.target.value)} />
                <ion-icon name="search-outline" onClick={() => searchChats(searchQuery)}></ion-icon>
            </div>
            <div className={"chats_list"}>
                <span>All Chats</span>
                <ul>
                    {
                        chats.map((chat, index) => {
                            return <li className={"chat_item"} onClick={() => chooseChat(chat)}>
                                <img src={defaultUserImg} alt={defaultUserImg} />
                                <div className={"chat_info"}>
                                    <div className={"chat_name"}>
                                        { chat?.userIds.indexOf(userUID) === 0 ? chat?.users[1] : chat?.users[0] }
                                    </div>
                                    <div className={"last_message"}>
                                        {
                                            chat?.lastMessageSenderId
                                            ?
                                                <span>
                                                    {
                                                        chat?.lastMessageSenderId.includes(userUID)
                                                        ?
                                                            "You: " + chat?.lastMessage.length > 19 ? chat?.lastMessage.substring(0, 19) + "..." :
                                                            "You: " + chat?.lastMessage : chat?.lastMessage.length > 25 ? chat?.lastMessage.substring(0, 25) + "..."
                                                        :
                                                            chat?.lastMessage
                                                    }
                                                </span>
                                            :
                                                <span>No messages</span>
                                        }
                                    </div>
                                </div>
                                <div className={"last_time"}>{chat?.lastMessageDate?.toString().substring(12)}</div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
        { chatItem !== null ? <Chat props={chatItem} type={true} /> : <Chat type={false} /> }
    </div>

}

export default Messenger;