import React, { useState, useEffect, useContext } from "react";
import ShowTeacherGrade from "./ShowTeacherGrade";
import {
  Grid,
  Container,
  Box
} from "@mui/material";
import { styled } from "@mui/system";
import AuthContext from "../components/AuthContext";
import { ThemeContext } from '../Contexts/ThemeContext';

const TeacherGrades = () => {
  const [grades, setGrades] = useState([]);
  const { token } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext); //provera teme zbog hover

  const AnimatedBox = styled(Box)({
    transition: "transform 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: darkMode ? "0px 5px 15px rgba(255, 255, 255, 0.4)" : "0px 5px 15px rgba(0, 0, 0, 0.4)",
    },
  });

  const fetchData = async () => {
    const url = "http://localhost:8080/api/v1/teachers/myGrades";
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    setGrades(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ marginTop: 3}}>
      <Grid container spacing={3}>
        {grades.map((grade) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={grade.id}>
            <AnimatedBox
              sx={{
                borderRadius: "5px",
                height: 255,
                width: 1,
                marginBottom: "20px",
                margin: "10px"
              }}
            >
              <ShowTeacherGrade grade={grade}  />
            </AnimatedBox>
          </Grid>
        ))}
        </Grid>
    </Container>
  );
};

export default TeacherGrades;
