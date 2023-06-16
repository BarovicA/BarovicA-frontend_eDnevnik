import React, { useState, useEffect, useContext } from "react";
import ShowTeacherSubject from "./ShowTeacherSubject";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import AuthContext from "../components/AuthContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import ErrorDisplay from "../ErrorDisplay";

const TeacherSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const { darkMode } = useContext(ThemeContext);
  const AnimatedBox = styled(Box)({
    transition: "transform 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: darkMode
        ? "0px 5px 15px rgba(255, 255, 255, 0.4)"
        : "0px 5px 15px rgba(0, 0, 0, 0.4)",
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const url = "http://localhost:8080/api/v1/teachers/mySubjects";

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSubjects(data);
      setFetchError(null);
    } catch (error) {
      setFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ marginTop: 3 }}>
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <CircularProgress sx={{ color: "#yourColor" }} />
        </Box>
      ) : fetchError ? (
        <ErrorDisplay error={fetchError} entity="subjects" />
      ) : (
        <>
          <Grid container spacing={3}>
            {subjects.map((subject) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
                <AnimatedBox
                  sx={{
                    borderRadius: "5px",
                    height: 255,
                    width: 1,
                    marginBottom: "20px",
                    margin: "10px",
                  }}
                >
                  <ShowTeacherSubject subject={subject} />
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default TeacherSubjects;
