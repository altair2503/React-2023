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
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "/player",
    element: <Player />,
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
