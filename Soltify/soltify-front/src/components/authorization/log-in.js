import Input from "../utilities/input/input";
import styles from "./authorization.module.css";

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase";

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {db} from "../../firebase";
import {collection, getDocs, where, query} from "firebase/firestore";

const LogIn = key=> {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user)
            if (user && user.uid) {
                const userData = await getUserData(user);
                localStorage.setItem
                ('token', user.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                console.error("User object is undefined")
            }
            navigate("/personal");
        } catch (error) {
            console.error(error);
        }
    }
    const getUserData = async (user) => {
        if (!user) {
            return
        }
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", user.uid));

<<<<<<< HEAD
        try {
            const querySnapshot = await getDocs(userQuery);
            if (querySnapshot.size > 0) {
                const doc = querySnapshot.docs[0]
                return doc.data();
            } else {
                return {}
            }
        } catch (error) {
            console.log("Error get data from Firestore", error);
            throw error;
        }
    }

        // const signIn = (e) => {
        // e.preventDefault();
        //
        // signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     console.log(userCredential)
        // })
        // .catch((error) => {
        //     console.log(error)
        // });
        // };

=======
>>>>>>> e8a74f89309060115bb6e0180945532410e193ca
    return (
        <div className={styles.container}>
        <div className={styles.background}>
            <div className={styles.return_back} onClick={() => navigate(-1)}>
                <ion-icon name="arrow-back-outline"></ion-icon>
                <span>Return back</span>
            </div>
            <div className={styles.title_cont}>
                <p className={styles.title}>Log In</p>
                <span className={styles.subtitle}>to continue to Soltify</span>
            </div>
            <form onSubmit={signIn}>
            <div className={styles.inputs}>
                <Input props={{name: 'Email'}}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
                <Input props={{name: 'Password', type: "password"}}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
                <a href="/sign-up" className={styles.sign_in_link}>Not registered yet? <span>Create an account</span></a>
            </div>
            </form>
        </div>
        </div>
    )
};

export default LogIn