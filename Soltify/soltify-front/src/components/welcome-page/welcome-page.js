import styles from './welcome-page.module.css';
import React from "react";

import logo from '../../assets/model.png';

const WelcomePage = () => {
    return (
        <div className={styles.background}>
            <header></header>
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
                <img src={logo} alt="model" />
                <div className={styles.adv_l}>
                    Listen to songs <span style={{fontSize: "40px", fontWeight: "500"}}>anywhere</span> <br/> and <span style={{fontSize: "40px", fontWeight: "500"}}>anytime</span> you want
                </div>
                <p className={styles.adv_c}>Music for everyone</p>
                <div className={styles.adv_r}>
                    <span style={{fontSize: "50px", fontWeight: "500"}}>0₸</span> for <strong style={{fontFamily: "Noto Sans JP"}}>∞</strong> month <br/> of Premium
                </div>
            </div>
            <div className={styles.sign_buttons}>
                <a href="login" className={styles.link_sign_in}>Log in</a>
                <a href="sign-up" className={styles.link_sign_up}>Sign up</a>
            </div>
        </div>
    )
};

export default WelcomePage;