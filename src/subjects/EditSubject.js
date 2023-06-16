import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import { produce } from "immer";

const schoolYears = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const semesters = ["FIRST", "SECOND"];

const EditSubject = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const isComponentMounted = useRef(true);

  const [subject, setSubject] = useState({
    name: "",
    weeklyHours: "",
    year: "",
    semester: "",
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`http://localhost:8080/api/v1/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cancelToken: source.token,
      })
      .then((response) => {
        if (isComponentMounted.current) {
          setSubject(response.data);
        }
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.log(error);
        }
      });

      return () => {
        isComponentMounted.current = false;
        source.cancel('Operation canceled by the user.');
      };
    }, [id, token]);
  

  const handleInputChange = (e) => {
    setSubject(
      produce(subject, (draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (subject.weeklyHours < 1 || subject.weeklyHours > 6 || isNaN(subject.weeklyHours)) {
      setAlert({ open: true, message: "Weekly hours must be a number between 1 and 6.", severity: "error" });
      return;
    }

    axios
      .put(`http://localhost:8080/api/v1/subjects/update/${id}`, subject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlert({ open: true, message: "Subject updated successfully.", severity: "success" });
        navigate(-1);
      })
      .catch((error) => {
        setAlert({ open: true, message: "Error while updating subject.", severity: "error" });
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        marginTop: 10,
        maxWidth: "30em",
        mx: "auto",
      }}
    >
      <Typography variant="h5" align="center" sx={{ pb: 2 }}>
        Edit Subject
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="name"
        label="Name"
        name="name"
        value={subject.name}
        onChange={handleInputChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="weeklyHours"
        label="Weekly Hours"
        name="weeklyHours"
        value={subject.weeklyHours}
        onChange={handleInputChange}
      />
      <FormControl fullWidth>
        <InputLabel>School Year</InputLabel>
        <Select
          label="School year"
          value={subject.year}
          name="year"
          onChange={handleInputChange}
          required
        >
          {schoolYears.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Semester</InputLabel>
        <Select
          label="Semester"
          value={subject.semester}
          name="semester"
          onChange={handleInputChange}
          required
        >
          {semesters.map((semester, index) => (
            <MenuItem key={index} value={semester}>
              {semester}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Subject
        </Button>
        <Button onClick={handleBack}>Back</Button>
      </Box>
      {alert.open && (
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};

export default EditSubject;
