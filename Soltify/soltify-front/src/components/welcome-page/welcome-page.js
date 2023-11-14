import React from "react";

import styles from './welcome-page.module.css';
import model from '../../assets/model1.png';
import logo from '../../assets/logo.png';

const WelcomePage = () => {
    return (
        <div className={styles.background}>
            <header>
                <img src={logo} className={styles.logo} alt={logo} />
                <ul>
                    <li><a href="/home" className={styles.git_link}>Home</a></li>
                    <li><a href="https://github.com/azikkw/React-2023/tree/main/Soltify" className={styles.git_link} target="_blank">GitHub/Soltify</a></li>
                </ul>
            </header>
            <span className={styles.title}>Soltify</span>
            <div className={styles.model}>
                <div className={styles.shapes}>
                    <div className={styles.shape_f}></div>
                    <div className={styles.shape_s}></div>
                </div>
                <div className={styles.shapes}>
                    <div className={styles.shape_f}></div>
                    <div className={styles.shape_s}></div>
                </div>
                <img src={model} alt="model" />
                <div className={styles.adv_l}>
                    add <span style={{fontSize: "43px", fontWeight: "500"}}>your favorite</span> <br/> songs to Soltify lib
                </div>
                <p className={styles.adv_c}>Music for everyone</p>
                <div className={styles.adv_r}>
                    <span style={{fontSize: "43px", fontWeight: "500"}}>0₸</span> for <strong style={{fontFamily: "Noto Sans JP"}}>∞</strong> month <br/> of Premium
                </div>
            </div>
            <div className={styles.sign_buttons}>
                <a href="/log-in" className={styles.link_sign_in}>Log in</a>
                <a href="/sign-up" className={styles.link_sign_up}>Sign up</a>

            </div>
        </div>
    )
};

export default WelcomePage;