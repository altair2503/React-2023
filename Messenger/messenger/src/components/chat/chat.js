import React, { useEffect, useState } from "react";
import './chat.css';

import {db} from "../../firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
// import {getChatMessages} from "../../service/messenger-service";
import {userUID} from "../../service/user-service";

import moment from 'moment';

import defaultUserImg from "../../assets/defaultUserImg.jpg";
import logo from '../../assets/logo.png'


const Chat = ({props, type}) => {

    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchChatMessages = async () => {
            try {
                const chatId = localStorage.getItem("chatId")
                if(chatId) {
                    const ref = collection(db, "chats", chatId, "messages")
                    const q = query(ref, orderBy("sentDate", "asc"))

                    onSnapshot(q, (querySnapshot) => {
                        const result = querySnapshot.docs.map(doc => doc.data())
                        setMessages(result)
                    });
                }
            } catch(error) {
                console.error("Error fetching chats:", error)
            }
        }
        fetchChatMessages().then()
    })

    async function addChatMessage(chatId, message) {
        if(message !== "") {
            const ref = collection(db, "chats", chatId, "messages")
            const chatRef = doc(db, "chats", chatId)
            const sentDate = moment().format("YYYY.MM.DD, kk:mm");

            addDoc(ref, {
                message: message,
                senderId: userUID,
                sentDate: sentDate
            }).then()

            updateDoc(chatRef, {
                lastMessage: message,
                lastMessageDate: sentDate,
                lastMessageSenderId: userUID
            }).then(() => {
                setMessageText("")
            })
        }
    }
    const addChatMessageByEnter = (e, chatId, message) => {
        if(e.key.toLowerCase() === "enter") addChatMessage(chatId, message).then()
    }

    if(!type) {
        return <div className={"chat_window default"}>
            <img src={logo} alt={logo} />
            <div className={"title"}>Messenger</div>
            <span>Cloud messenger for communicating with your friends, <br/> family and acquaintances</span>
        </div>
    }
    else return <div className={"chat_window"}>
        <div className={"window_top"}>
            <div className={"interlocutor"}>
                <img src={defaultUserImg} alt={defaultUserImg} />
                <div className={"interlocutor_info"}>
                    <div className={"interlocutor_name"}>
                        {props?.userIds.indexOf(userUID) === 0 ? props?.users[1] : props?.users[0]}
                    </div>
                    <span>
                        { props.lastMessageDate ? "Last was " + props?.lastMessageDate : props?.userIds.indexOf(userUID) === 0 ? "Say hello to " + props?.users[1] : "Say hello to " + props?.users[0] }
                    </span>
                </div>
            </div>
        </div>
        <div className={"window_center"}>
            <div className={"center_container"}>
                {
                    messages.map((message, index) => {
                        return <div className={message?.senderId.includes(userUID) ? "message_back" : "message_back sender"}>
                            <div className={"message_text"}>
                                <div className={"text"}>{message?.message}</div>
                                <span className={"sent_date"}>{message?.sentDate.toString()}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <div className={"window_bottom"}>
            <input type="text" value={messageText} placeholder={"Write a message..."} onChange={(e) => setMessageText(e.target.value)} onKeyDown={(e) => addChatMessageByEnter(e, localStorage.getItem("chatId"), messageText)}  />
            <button onClick={() => addChatMessage(localStorage.getItem("chatId"), messageText)}>
                <ion-icon name="send-outline"></ion-icon>
            </button>
        </div>
    </div>
}

export default Chat;
