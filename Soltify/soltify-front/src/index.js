import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';

import ErrorPage from './components/error-page/error-page';
import WelcomePage from './components/welcome-page/welcome-page';
import SignUp from './components/authorization/sign-up';
import LogIn from './components/authorization/log-in';
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
    path: "",
    element: <HomePage />,
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
