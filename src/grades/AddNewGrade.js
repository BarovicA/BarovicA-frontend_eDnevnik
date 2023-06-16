import React, { useState, useContext } from 'react';
import { Container, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Alert 
    } from '@mui/material';
import AuthContext from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const schoolYears = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const units = [1, 2, 3, 4 ];

const AddNewGrade = () => {
  const [schoolYear, setSchoolYear] = useState("");
  const [unit, setUnit] = useState("");
  const { token } = useContext(AuthContext);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const newSubject = {
      schoolYear,
      unit, 
      deleted: false,
    };

    const response = await fetch(`http://localhost:8080/api/v1/grades/add`, {
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
    setSchoolYear("");
    setUnit("");
  } else if (response.status === 409) {
    setAlert({ open: true, message: "The grade already exists.", severity: "error" });
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
          maxWidth: '30em', 
          mx: 'auto' 
        }}
      >
     
      <FormControl fullWidth>
        <InputLabel>School Year</InputLabel>
        <Select
          label="School year"
          value={schoolYear}
          onChange={(e) => setSchoolYear(e.target.value)}
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
        <InputLabel>unit</InputLabel>
        <Select
          label="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        >
          {units.map((unit, index) => (
            <MenuItem key={index} value={unit}>
              {unit}
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
          <Button variant="contained" type="submit">Add New Grade</Button>
          <Button variant="outlined" onClick={handleBack}>Back</Button>
        </Box>
        {alert.open && (
          <Alert autoHideDuration={6000} severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
            {alert.message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AddNewGrade;