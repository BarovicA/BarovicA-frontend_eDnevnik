import React, { useState, useEffect, useContext } from "react";
import ShowGrade from "./ShowGrade";
import {
  Button,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar, 
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import AuthContext from "../components/AuthContext";
import { ThemeContext } from '../Contexts/ThemeContext';

const schoolYears = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const units = ["", 1, 2, 3, 4, 5]; 

const Grades = () => {
  
  //"http://localhost:8080/api/v1/grades/all"
  
  const [yearFilter, setYearFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("");
  const [grades, setGrades] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [open, setOpen] = useState(false); // kontrola za otvaranje/zatvaranje dijaloga
  const [deleteId, setDeleteId] = useState(null); // id predmeta za brisanje
  
  const { darkMode } = useContext(ThemeContext); //provera teme zbog hover
  const AnimatedBox = styled(Box)({
    transition: "transform 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: darkMode ? "0px 5px 15px rgba(255, 255, 255, 0.4)" : "0px 5px 15px rgba(0, 0, 0, 0.4)",
    },
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const fetchData = async () => {
    const url = new URL("http://localhost:8080/api/v1/grades/all");

    if (yearFilter) {
      url.searchParams.append("schoolYear", yearFilter);
    }

    if (unitFilter) {
      url.searchParams.append("unit", unitFilter);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    setGrades(data);
    
  };

  useEffect(() => {
    fetchData();
  }, [yearFilter, unitFilter]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/grades/delete/${deleteId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      // poruka i otvaranje snackbar
      setSnackbarMessage("Subject deleted successfully.");
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      fetchData();
    } else {
      // poruka i otvaranje snackbar
      setSnackbarMessage("Error while deleting subject.");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }

    handleClose();
  };

  return (
    <Container sx={{ marginTop: 3}}>
    <Grid container spacing={6} 
       sx={{display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="year-select-label">School Year</InputLabel>
          <Select
            labelId="year-select-label"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            label="School Year"
          >
            {schoolYears.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year || "None"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="semester-select-label">Unit</InputLabel>
          <Select
            labelId="semester-select-label"
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            label="Unit"
          >
            {units.map((unit, index) => (
              <MenuItem key={index} value={unit}>
                {unit || "None"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          sx={{height: "100%", lineHeight: 'normal'}}
          variant="outlined"
          onClick={() => navigate("/main/addnewgrade")}
          fullWidth
          size="large"
        >
          Add new 
        </Button>
      </Grid>
    </Grid>
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
              <ShowGrade grade={grade} handleDelete={handleDelete} />
            </AnimatedBox>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Delete Grade"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this grade?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );


};

export default Grades;