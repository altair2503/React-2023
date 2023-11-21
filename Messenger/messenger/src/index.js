import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LogIn from "./components/authorizathion/log-in";
import SignUp from "./components/authorizathion/sign-up";
import Messenger from "./components/messenger/messenger";
import Chat from "./components/chat/chat";
import Users from "./components/users/users";
import AppWindow from "./components/app-window/app-window";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppWindow/>,
        children: [
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/',
                element: <Messenger />
            }
        ]
    },
    {
        path: '/log-in',
        element: <LogIn />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();