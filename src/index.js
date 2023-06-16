import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/Login";
import MainPage from "./components/MainPage";
import Subjects from "./components/Subjects";
import Grades from "./grades/Grades";
import EditGrade from "./grades/EditGrade";
import GradeDetails from "./grades/GradeDetails";
import AddNewGrade from "./grades/AddNewGrade";
import AddNewSubject from "./components/AddNewSubject";
import AuthProvider from "./components/AuthProvider";
import { ThemeProvider } from "./Contexts/ThemeContext";
import SubjectDetails from "./subjects/SubjectDetails";
import EditSubject from "./subjects/EditSubject";
import ProtectedRoute from './ProtectedRoute';
import TeacherSubjects from "./subjects/TeacherSubjects";
import TeacherGrades from "./grades/TeacherGrades";
import StudentSubjects from "./subjects/StudentSubjects";
import TeacherSubjectDetails from "./subjects/TeacherSubjectDetails";
import TeacherGradeDetails from "./grades/TeacherGradeDetails";

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
        element: <ProtectedRoute component={MainPage} />,
        children: [
          {
            path: "subjects",
            element: <Subjects />,
            
          },
          {
            path: "addnewsubject",
            element: <AddNewSubject />,
          },
          {
            path: "subjects/:id",
            element: <SubjectDetails />,
          },
          {
            path: "subjects/edit/:id",
            element: <EditSubject />,
          },
          {
            path: "grades",
            element: <Grades />,
            
          },
          {
            path: "addnewgrade",
            element: <AddNewGrade />,
          },
          {
            path: "grades/:id",
            element: <GradeDetails />,
          },
          {
            path: "grades/edit/:id",
            element: <EditGrade />,
          },
          {
            path: "teachersubjects",
            element: <TeacherSubjects />,
            
          },
          {
            path: "teachergrades",
            element: <TeacherGrades />,
          },
          {
            path: "studentsubjects",
            element: <StudentSubjects />,
          },
          {
            path: "teachersubjects/:id",
            element: <TeacherSubjectDetails />,
          },
          {
            path: "teachergrades/:id",
            element: <TeacherGradeDetails />,
          },

        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>{" "}
    {/* Kraj ThemeProvider */}
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
