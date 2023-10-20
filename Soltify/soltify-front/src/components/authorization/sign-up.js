import Input from "../utilities/input/input";
import styles from "./authorization.module.css"
import React, {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";


const SignUp = ()=>{
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password1, setPassword1] = useState();

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
                console.log(userCredential)
            })
            .catch((error) => {
                console.log(error)
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.return_back}>
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
                    <Input props={{name: 'Password verificaton', type: 'password'}}
                        value={password1}
                           onChange={(e) => setPassword1(e.target.value)}
                    />
                    <a href="/login">
                        <button type="submit">Sign up</button>
                    </a>
                    <a href="/login" className={styles.sign_in_link}>Already have an account? <span>Sign in</span></a>
                </div>
                </form>
            </div>
        </div>
    )
};

export default SignUp;