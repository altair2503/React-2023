import React from 'react';
import {auth} from "../firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const PersonalAcc = () => {

    // const user = (JSON).parse(localStorage.getItem('user'));
    // const navigate = useNavigate();
    // const Logout = async () => {
    //     try {
    //         await signOut(auth);
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('user');
    //         navigate("/log-in");
    //     }catch (error) {
    //         console.log(error)
    //     }
    // }
    return (
        <div>
            {/*<h1>Welcome to React Firebase Auth using email and password</h1>*/}
            {/*<h2>{user && user.email}</h2>*/}
            {/*<button onClick={Logout}>Logout</button>*/}
        </div>

    );
};

export default PersonalAcc;