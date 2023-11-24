import Input from "../utilities/input-item/input";
import styles from "./authorization.module.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";

import React, {useState} from "react";
import {Navigate, Route, useNavigate} from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 


const SignUp = ()=>{

    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password1, setPassword1] = useState();

    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault()
        if (password !== password1) {
            console.log("Passwords do not match");
            return
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password).then((cred)=> {
                setDoc(doc(db, "users", cred.user.uid), {
                    name: firstname,
                    lastname: lastname,
                    email: email,
                    date: new Date(),
                    img: "",
                    playlist: [{
                        img: "https://firebasestorage.googleapis.com/v0/b/soltify-2.appspot.com/o/images%2Flikedplaylist.jpg?alt=media&token=11245159-b850-4f0c-941d-31c3516e51f5",
                        name: "Liked",
                        songs: []
                    }]
                });
                const user =  cred.user;
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
            }).finally(()=>{
                navigate("/log-in");
            });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.return_back} onClick={() => navigate(-1)}>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                    <span>Return back</span>
                </div>
                <div className={styles.title_cont}>
                    <p className={styles.title}>Sign Up</p>
                    <span className={styles.subtitle}>to continue to Soltify</span>
                </div>
                <form onSubmit={signUp}>
                    <div className={styles.inputs}>
                        <Input props={{name: 'First name'}}
                               value={firstname}
                               onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input props={{name: 'Last name'}}
                               value={lastname}
                               onChange={(e) => setLastName(e.target.value)}
                        />
                        <Input props={{name: 'Email', type: 'email'}}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input props={{name: 'Password', type: 'password'}}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input props={{name: 'Password verification', type: 'password'}}
                               value={password1}
                               onChange={(e) => setPassword1(e.target.value)}
                        />
                        <button type="submit">Sign up</button>
                        <a href="/log-in" className={styles.sign_in_link}>Already have an account? <span>Log in</span></a>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignUp;