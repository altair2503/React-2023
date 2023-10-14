import styles from './WelcomePage.module.css';
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
                <img src={logo} alt="model" />
            </div>
        </div>
    )
};

export default WelcomePage;