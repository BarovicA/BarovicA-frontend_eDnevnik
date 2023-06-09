import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ShowSubject = ({subject, handleDelete}) => {
  return (
    <Card
      variant="outlined"
      sx={{ border: "solid #a6a4a4 0.1px", margin: "10px" }}
    >
      <CardContent>
        <Typography variant="h5" align="center" sx={{ paddingBottom: "20px" }}>
          {subject.name}
        </Typography>
        <Typography color="textSecondary" align="center" sx={{ lineHeight: 2 }}>
          School year: {subject.year}
        </Typography>
        <Typography color="textSecondary" align="center" sx={{ lineHeight: 2 }}>
          Semester: {subject.semester}
        </Typography>
        <Typography
          color="textSecondary"
          align="center"
          sx={{ paddingBottom: "20px", lineHeight: 2 }}
        >
          Weekly Hours: {subject.weeklyHours}
        </Typography>

        <Box sx={{display: "flex", justifyContent: "space-around"}} >
        <IconButton
          color="primary"
          component={NavLink}
          to={`/main/subjects/${subject.id}`}
        >
          <InfoIcon />
        </IconButton>
        <IconButton
          color="primary"
          component={NavLink}
          to={`/main/subjects/edit/${subject.id}`}
        >
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => handleDelete(subject.id)}>
          <DeleteIcon />
        </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
export default ShowSubject;
