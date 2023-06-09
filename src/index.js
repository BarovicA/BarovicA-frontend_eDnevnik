import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/Login";
import MainPage from "./components/MainPage";
import Subjects from "./components/Subjects";
import Grades from "./components/Grades";
import AddNewSubject from "./components/AddNewSubject"
import AuthProvider from "./components/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "main",
        element: <MainPage />,
        children: [
          {
            path: "subjects",
            element: <Subjects />,
          },
          {
            path: "grades",
            element: <Grades />
          },
          {
            path: "addnewsubject",
            element: <AddNewSubject />
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </AuthProvider>
);
reportWebVitals();

/* 
Aleksa Barović  
https://github.com/BarovicA/backEnd_eDnevnik 

*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
