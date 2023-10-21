import './App.css';
import WelcomePage from "./components/welcome-page/welcome-page";
import LogIn from './components/authorization/log-in';
import SignUp from './components/authorization/sign-up';
import React from "react";
import Player from "./components/player/player";
import {BrowserRouter, Outlet, Route, Router, Routes} from "react-router-dom";
import Navbar from "./oldmethod/Navbar";
import HomePage from "./components/home-page/home-page";
import ContentPage from "./components/content/content-page";



function App() {
  return (
      <div>
      </div>
      // <WelcomePage />
      // <SignUp/>
      // <LogIn />
      // <BrowserRouter>
      //   <Navbar/>
      // </BrowserRouter>
  );
}

export default App;