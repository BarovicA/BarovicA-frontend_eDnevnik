import { Card, CardContent, Typography, IconButton, Box, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const ShowTeacherSubject = ({ subject }) => {
  return (
    <Card
      variant="outlined"
      sx={{  height: '100%', overflow: 'auto' }}
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

        <Box sx={{display: "flex", justifyContent: "center"}} >
          <Tooltip disableFocusListener disableTouchListener title="Details">
            <IconButton
              color="primary"
              component={NavLink}
              to={`/main/teachersubjects/${subject.id}`}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShowTeacherSubject;
