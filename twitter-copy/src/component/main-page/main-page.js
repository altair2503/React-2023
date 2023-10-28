import React, {useState} from "react";
import {Outlet} from "react-router-dom";

import './main-page.css'

const MainPage = () => {
    return <div className={"main_back"}>
        <header>
            <div>Twitter-Copy</div>
        </header>
        <div className={"main_cont"}>
            <div className={"left"}>
                <ul>
                    <li><a href={"/home"}>Home</a></li>
                    <li><a href={"/profile"}>Profile</a></li>
                </ul>
            </div>
            <div className={"content"}>
                <div className={"search"}>
                    <input placeholder={"Search..."}/>
                    <button type="submit">Search</button>
                </div>
                <Outlet />
            </div>
        </div>
    </div>
}

export default MainPage;