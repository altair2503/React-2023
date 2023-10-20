import React, {useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import PersonalAcc from "./PersonalAcc";

const Protected = () => {
    const token = localStorage.getItem('token');

    return (
        token ? <PersonalAcc/> : <Navigate to="/log-in"/>
    )
};

export default Protected;