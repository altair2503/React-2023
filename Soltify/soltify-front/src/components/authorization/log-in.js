import Input from "../utilities/input/input";
import styles from "./authorization.module.css"

import React from "react";
const LogIn = ()=> {
    return (
        <div className={styles.container}>
        <div className={styles.background}>
            <div className={styles.return_back}>
                <span>Return back</span>
            </div>
            <div className={styles.title_cont}>
                <p className={styles.title}>Log In</p>
                <span className={styles.subtitle}>to continue to Soltify</span>
            </div>
            <div className={styles.inputs}>
            <Input props={{name: 'Username'}} />
                <Input props={{name: 'Password'}} />
                <button>Log in</button>
                <a href="" className={styles.sign_in_link}>Not registered yet? <span>Create an account</span></a>
            </div>
        </div>
        </div>


    )
};

export default LogIn