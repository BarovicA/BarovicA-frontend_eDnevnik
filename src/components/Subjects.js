import React, { useState, useEffect, useContext } from "react";
import ShowSubject from "./ShowSubject";
import {
  TextField,
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
import AuthContext from "./AuthContext";

const schoolYears = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const semesters = ["", "FIRST", "SECOND"];

const AnimatedBox = styled(Box)({
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.4)",
  },
});

const Subjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [open, setOpen] = useState(false); // kontrola za otvaranje/zatvaranje dijaloga
  const [deleteId, setDeleteId] = useState(null); // id predmeta za brisanje

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const fetchData = async () => {
    const url = new URL("http://localhost:8080/api/v1/subjects/search");

    if (searchQuery) {
      url.searchParams.append("name", searchQuery);
    }

    if (yearFilter) {
      url.searchParams.append("year", yearFilter);
    }

    if (semesterFilter) {
      url.searchParams.append("semester", semesterFilter);
    }

    const response = await fetch(url.toString());
    const data = await response.json();
    setSubjects(data);
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, yearFilter, semesterFilter]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/subjects/delete/${deleteId}`, {
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
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
          marginTop: 2,
          paddingLeft: "12px"
        }}
      >
        <TextField
          label="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
      
        />
        <FormControl variant="outlined">
          <InputLabel id="year-select-label">School Year</InputLabel>
          <Select
            sx={{ width: "130px" }}
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
        <FormControl variant="outlined">
          <InputLabel id="semester-select-label">Semester</InputLabel>
          <Select
            sx={{ width: "130px" }}
            labelId="semester-select-label"
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            label="Semester"
          >
            {semesters.map((semester, index) => (
              <MenuItem key={index} value={semester}>
                {semester || "None"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => navigate("/main/addnewsubject")}
        >
          Add new 
        </Button>
      </Box>
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
            <AnimatedBox
              sx={{
                borderRadius: "5px",
                height: 255,
                width: 1,
                marginBottom: "20px",
                margin: "10px"
              }}
            >
              <ShowSubject subject={subject} handleDelete={handleDelete} />
            </AnimatedBox>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Delete Subject"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this subject?
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

export default Subjects;
