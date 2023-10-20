import './App.css';
import WelcomePage from "./components/welcome-page/welcome-page";
import LogIn from './components/authorization/log-in';
import SignUp from './components/authorization/sign-up';
import React from "react";
import Player from "./components/player/player";
import {BrowserRouter, Outlet} from "react-router-dom";
import Navbar from "./oldmethod/Navbar";



function App() {
  return (
      // <WelcomePage />
      // <SignUp/>
      // <LogIn />
      <Outlet/>
      // <BrowserRouter>
      //   <Navbar/>
      // </BrowserRouter>
  );
}

export default App;