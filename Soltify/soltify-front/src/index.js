import React from 'react';
import App from "./App";
import './index.css';
import WelcomePage from './components/welcome-page/welcome-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import ErrorPage from './components/error-page/error-page';
import SignUp from './components/authorization/sign-up';
import LogIn from './components/authorization/log-in';
import Player from "./components/player/player";
import welcomePage from "./components/welcome-page/welcome-page";
import HomePage from "./components/home-page/home-page";
import PersonalAcc from "./components/PersonalAcc";
import Protected from "./components/Protected";
import ContentPage from "./components/content/content-page";
import ReactDOM from "react-dom"
import PlaylistPage from "./components/playlist/playlist-page";
import AccountPage from "./components/account-page/account-page";
import CreatePlaylistPage from "./components/create-playlist-page/create-playlist-page";
import PlaylistsPage from "./components/playlists-page/playlists-page";
import ArtistPage from "./components/artist-page/artist-page";


const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: "/log-in",
    element: <LogIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home/",
        element: <ContentPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/home/playlists/:playlistName",
        element: <PlaylistPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/home/account",
        element: <AccountPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/home/create-playlist",
        element: <CreatePlaylistPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/home/playlists",
        element: <PlaylistsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/home/artist",
        element: <ArtistPage />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "/personal",
    element: <Protected/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//
// ReactDOM.render (
//     <App />,
//     document.getElementById('root')
// );