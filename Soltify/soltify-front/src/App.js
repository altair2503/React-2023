import './App.css';
import WelcomePage from "./components/welcome-page/welcome-page";
import LogIn from './components/authorization/log-in';
import SignUp from './components/authorization/sign-up';
import React from "react";
import Player from "./components/player/player";
import {BrowserRouter} from "react-router-dom";



function App() {
  return (
      <div className={"background"}>
        <div className={"background_layer"}>
          <div className={"home_top"}>
            <div className={"menu"}>

            </div>
            <div className={"home_container"}>
              <div className={"top_bar"}>

              </div>
              <div className={"content"}>

              </div>
            </div>
          </div>
          <Player />
        </div>
      </div>
  );
}

export default App;