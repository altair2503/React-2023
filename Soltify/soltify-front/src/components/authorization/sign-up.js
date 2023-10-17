import Input from "../utilities/input";
import styles from "./authorization.module.css"

import React from "react";

const SignUp = ()=>{
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
                    <Input props={{name: 'Username'}}/>
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