import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import reportWebVitals from './reportWebVitals';
import WelcomePage from './components/welcome-page/welcome-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/authorization/sign-up';
import LogIn from './components/authorization/log-in';
import ErrorPage from './components/error-page/error-page';
import Player from "./components/player/player";
import welcomePage from "./components/welcome-page/welcome-page";

// export const publicRoutes = [
//   {
//     path: "/welcome",
//     Component: welcomePage
//   }
// ]
// export const privateRoutes = [
//   {
//     path: "player"
//   }
// ]

import HomePage from "./components/home-page/home-page";


const router = createBrowserRouter([
  {
    path: "/welcome",
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
    errorElement: <ErrorPage />
  },
  {
    path: "",
    element: <WelcomePage />,
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
