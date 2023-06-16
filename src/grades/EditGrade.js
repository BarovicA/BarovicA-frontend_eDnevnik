import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Alert } from "@mui/material";
import { produce } from "immer";

const schoolYears = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const units = [1, 2, 3, 4];

const EditGrade = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [grade, setGrade] = useState({
    schoolYear: "",
    unit: "",
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/grades/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGrade(response.data);
      });
  }, [id, token]);

  const handleInputChange = (e) => {
    setGrade(
      produce(grade, (draft) => {
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
      .put(`http://localhost:8080/api/v1/grades/upadte/${id}`, grade, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlert({ open: true, message: "Grade updated successfully.", severity: "success" });
        navigate(-1);
      })
      .catch((error) => {
        setAlert({ open: true, message: "Error while updating grade.", severity: "error" });
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
      <FormControl fullWidth>
        <InputLabel>School Year</InputLabel>
        <Select
          label="School year"
          value={grade.schoolYear}
          name="schoolYear"
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
        <InputLabel>Unit</InputLabel>
        <Select
          label="Unit"
          value={grade.unit}
          name="unit"
          onChange={handleInputChange}
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
          Update Grade
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

export default EditGrade;
