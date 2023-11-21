import React, {useState} from "react";
import './authorization.css';

import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, where, query } from "firebase/firestore";
import { auth, db } from '../../firebase';

import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const logIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user && user.uid) { // eslint-disable-next-line no-unused-vars
                const userData = await getUserData(user);
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
            } else console.error("User object is undefined");

            navigate("/");
        }
        catch(error) {
            console.log(error)
        }
    }

    const getUserData = async (user) => {
        if(!user) return;

        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", user.uid));

        try {
            const querySnapshot = await getDocs(userQuery);
            if(querySnapshot.size > 0) {
                const doc = querySnapshot.docs[0]
                return doc.data();
            } else return {};
        }
        catch(error) {
            console.log("Error get data from Firestore", error);
            throw error;
        }
    }

    return <div className={"background"} style={{flexDirection: 'column'}}>
        <div className={"greeting"}>
            <img src={logo} alt={logo} />
            <div className={"greeting_message"}>
                <div className={"title"}>Messenger</div>
                <span>Please fill in all the required fields to log in <br/> to Messenger</span>
            </div>
        </div>
        <form onSubmit={logIn} className={"auth_form"}>
            <input type="email" value={email} placeholder={"Enter your e-mail"} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder={"Enter your password"} onChange={(e) => setPassword(e.target.value)} />
            <button type={"submit"}>Log in</button>
        </form>
        <a href="/sign-up" className={"link_to"}>Not registered yet? <span>Create an account</span></a>
    </div>

}

export default LogIn;
