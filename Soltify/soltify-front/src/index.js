import React from 'react';
import ReactDOM from "react-dom"

import App from "./App";
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import WelcomePage from './components/welcome-page/welcome-page';
import SignUp from './components/authorization/sign-up';
import LogIn from './components/authorization/log-in';

import HomePage from "./components/home-page/home-page";
import SearchPage from "./components/search-page/search-page";
import ContentPage from "./components/content-page/content-page";
import CreatePlaylistPage from "./components/create-playlist-page/create-playlist-page";
import PlaylistsPage from "./components/playlists-page/playlists-page";
import PlaylistPage from "./components/playlist-page/playlist-page";
import AccountPage from "./components/account-page/account-page";
import ArtistPage from "./components/artist-page/artist-page";
import ErrorPage from './components/error-page/error-page';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import AddSongPage from "./components/add-song-page/add-song-page";


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
                path: "/home/playlists/:index",
                element: <PlaylistPage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/home/account",
                element: <AccountPage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/home/create-playlist-page",
                element: <CreatePlaylistPage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/home/playlists",
                element: <PlaylistsPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/home/artist/:username",
                element: <ArtistPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/home/search",
                element: <SearchPage />,
                errorElement: <ErrorPage />
            }
        ]
    },
    {
        path: "/add-song",
        element: <AddSongPage />,
        errorElement: <ErrorPage />
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
        <RouterProvider router={router}/>
    </React.StrictMode>
);

serviceWorkerRegistration.register();


// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();