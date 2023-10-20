import Input from "../utilities/input/input";
import styles from "./authorization.module.css"
import React, {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";


const SignUp = ()=>{
    // const [firstname, setFirstName] = useState();
    // const [lastname, setLastName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // const [password1, setPassword1] = useState();
    // const signUp = (e) => {
    //     e.preventDefault();
    //     createUserWithEmailAndPassword(auth,email, password)
    //         .then((userCredential) => {
    //             console.log(userCredential)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // };

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
                <div className={styles.inputs}>
                    <Input props={{name: 'First name'}}/>
                    <Input props={{name: 'Last name'}}/>
                    <Input props={{name: 'Email', type: 'email'}}/>
                    <Input props={{name: 'Password', type: 'password'}}/>
                    <Input props={{name: 'Password verificaton', type: 'password'}}/>
                    <button>Sign up</button>
                    <a href="/login" className={styles.sign_in_link}>Already have an account? <span>Sign in</span></a>
                </div>
            </div>
        </div>
    )
};

export default SignUp;