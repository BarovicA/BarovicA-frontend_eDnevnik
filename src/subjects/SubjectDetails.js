import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  CardMedia,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import subjectImage from "../subjectImage.png";

const SubjectDetails = () => {
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/subjects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubject(response.data);
      } catch (error) {
        setError("An error occurred while fetching the data.");
        setOpenSnackbar(true);
      }
    };

    fetchSubject();
  }, [id, token]);


  return (
    <>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "30em", margin: "3px" }}>
          <CardContent>
            <Typography variant="h5" align="center" sx={{ padding: "20px" }}>
              {subject.name}
            </Typography>
            <CardMedia
              sx={{ height: 250, marginBottom: "30px" }}
              image={subjectImage}
              title="subjects"
            />
            <Typography color="textSecondary">ID: {subject.id}</Typography>
            <Typography color="textSecondary">
              School year: {subject.year}
            </Typography>
            <Typography color="textSecondary">
              Semester: {subject.semester}
            </Typography>
            <Typography color="textSecondary">
              Weekly Hours: {subject.weeklyHours}
            </Typography>
            <Typography color="textSecondary">Teachers:</Typography>
            <div>
              {subject.teachers.map((teacher) => (
                <Typography key={teacher.id} sx={{ paddingLeft: "30px" }}>
                  {teacher.firstName} {teacher.lastName}
                </Typography>
              ))}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={7000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SubjectDetails;
