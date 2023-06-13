import React, { useState, useContext } from 'react';
import { Container, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Alert 
    } from '@mui/material';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const schoolYears = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const semesters = ["FIRST", "SECOND"];

const AddNewSubject = () => {
  const [name, setName] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const { token } = useContext(AuthContext);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSubject = {
      name,
      weeklyHours: parseInt(weeklyHours),
      year,
      semester,
      deleted: false,
    };

    const response = await fetch(`http://localhost:8080/api/v1/subjects/add`, {
    method: 'POST',
    //{credentials: 'include',}
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newSubject)
  });

  if (response.ok) {
    setAlert({ open: true, message: "Subject added successfully.", severity: "success" });
    // reset form
    setName("");
    setWeeklyHours("");
    setYear("");
    setSemester("");
  } else if (response.status === 409) {
    setAlert({ open: true, message: "The subject already exists.", severity: "error" });
  } else {
    setAlert({ open: true, message: "Error while adding subject.", severity: "error" });
  }
};

  const handleBack = () => {
    navigate(-1);
  }; 

return (
    <Container>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 4, 
          marginTop: 10, 
          maxWidth: '40%', 
          mx: 'auto' 
        }}
      >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Weekly Hours"
        value={weeklyHours}
        onChange={(e) => setWeeklyHours(e.target.value)}
        required
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>School Year</InputLabel>
        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
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
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
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
            display: 'flex', 
            justifyContent: 'space-between',
            gap: 4
          }}
        >
          <Button type="submit">Add New Subject</Button>
          <Button onClick={handleBack}>Back</Button>
        </Box>
        {alert.open && (
          <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
            {alert.message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AddNewSubject;
