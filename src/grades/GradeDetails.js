import gradeImage from "../gradeImage.webp";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {Grid, Card, Box, CardContent, Typography, Button, Snackbar, Alert, CardMedia } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GradeDetails = () => {
    const [grade, setGrade] = useState(null);
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
      const fetchGrade = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/grades/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setGrade(response.data);
        } catch (error) {
          setError("An error occurred while fetching the data.");
          setOpenSnackbar(true);
        }
      };
  
      fetchGrade();
    }, [id, token]);
  
    if (!grade) return "Loading...";

  return (
       <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Grid sx = {{display: "flex", justifyContent: "center"}}>
      <Card sx={{width: "25em", margin: "3px"}}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{padding: "20px"}} >
          {grade.schoolYear} {grade.unit}
          </Typography>
          <Box sx={{marginBottom: "20px", height: 250, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={gradeImage} alt="grade" style={{ height: '100%', width: '100%' }} />
  </Box>
          <Typography color="textSecondary">
            ID: {grade.id}
          </Typography>
          <Typography color="textSecondary">
            School year: {grade.schoolYear}
          </Typography>
          <Typography color="textSecondary">
            Semester: {grade.unit}
          </Typography>
          <Typography color="textSecondary">
            Students:
            {grade.student.map((student) => (
              <Typography key={student.id} sx={{paddingLeft: "30px"}}>
                {student.firstName} {student.lastName}
              </Typography>
            ))}
          </Typography>
        </CardContent>
      </Card>
      </Grid>
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


export default GradeDetails;