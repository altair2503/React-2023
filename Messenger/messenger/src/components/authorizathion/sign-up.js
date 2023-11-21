import React, {useState} from "react";
import './authorization.css';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';

import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

const SignUp = () => {

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    
    const signUp = async (e) => {
        e.preventDefault();
        try { // eslint-disable-next-line no-unused-vars
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                .then((credential) => {
                    setDoc(doc(db, "users", credential.user.uid), {
                        id: credential.user.uid,
                        email: email,
                        username: username
                    });
                    const user = credential.user;

                    localStorage.setItem('token', user.accessToken);
                    localStorage.setItem('user', JSON.stringify(user));
                }
            ).finally(() => {
                navigate('/log-in')
            });
        } catch(error) {
            console.log(error)
        }
    }

    return  <div className={"background"} style={{flexDirection: 'column'}}>
        <div className={"greeting"}>
            <img src={logo} alt={logo} />
            <div className={"greeting_message"}>
                <div className={"title"}>Messenger</div>
                <span>Please fill in all the required fields to sign up <br/> to Messenger</span>
            </div>
        </div>
        <form onSubmit={signUp} className={"auth_form"}>
            <input type="email" value={email} placeholder={"Enter your e-mail"} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" value={username} placeholder={"Enter your username"} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} placeholder={"Enter your password"} onChange={(e) => setPassword(e.target.value)} />
            <button type={"submit"}>Sign up</button>
        </form>
        <a href="/log-in" className={"link_to"}>Already have an account? <span>Log in</span></a>
    </div>

}

export default SignUp;
