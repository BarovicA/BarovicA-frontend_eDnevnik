import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Snackbar, Alert } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SubjectDetails = () => {
    const [subject, setSubject] = useState(null);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
  
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackbar(false);
    };
  
    useEffect(() => {
      const fetchSubject = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/subjects/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setSubject(response.data);
        } catch (error) {
          setError("An error occurred while fetching the data.");
          setOpenSnackbar(true);
        }
      };
  
      fetchSubject();
    }, [id, token]);
  
    if (!subject) return "Loading...";

  return (
       <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {subject.name}
          </Typography>
          <Typography color="textSecondary">
            School year: {subject.year}
          </Typography>
          <Typography color="textSecondary">
            Semester: {subject.semester}
          </Typography>
          <Typography color="textSecondary">
            Weekly Hours: {subject.weeklyHours}
          </Typography>
          <Typography color="textSecondary">
            Teachers:
            {subject.teachers.map((teacher) => (
              <Typography key={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </Typography>
            ))}
          </Typography>
        </CardContent>
      </Card>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={7000} 
        onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SubjectDetails;