import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { produce } from "immer";

const schoolYears = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const semesters = ["FIRST", "SECOND"];

const EditSubject = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subject, setSubject] = useState({
    name: "",
    weeklyHours: "",
    year: "",
    semester: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSubject(response.data);
      });
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
    axios
      .put(`http://localhost:8080/api/v1/subjects/update/${id}`, subject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        // Handle error here
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
    </Box>
  );
};

export default EditSubject;
