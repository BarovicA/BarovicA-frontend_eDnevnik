import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ShowGrade = ({ grade, handleDelete }) => {
    return (
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            overflow: "auto"
          }}
        >
          <CardContent >
            <Typography variant="h5" align="center" sx={{ paddingBottom: "20px" }}>
              {grade.schoolYear} {grade.unit}
            </Typography>
          </CardContent>
      
          <CardContent sx={{padding: 0}}>
            <Typography color="textSecondary" align="center" sx={{ lineHeight: 2 }}>
              School year: {grade.schoolYear}
            </Typography>
            <Typography color="textSecondary" align="center" sx={{ lineHeight: 2 }}>
              Unit: {grade.unit}
            </Typography>
          </CardContent>
      
          <CardContent sx={{padding: 0}}>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Tooltip disableFocusListener disableTouchListener title="Details">
                <IconButton
                  color="primary"
                  component={NavLink}
                  to={`/main/grades/${grade.id}`}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip disableFocusListener disableTouchListener title="Edit">
                <IconButton
                  color="secondary"
                  component={NavLink}
                  to={`/main/grades/edit/${grade.id}`}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip disableFocusListener disableTouchListener title="Delete">
                <IconButton color="third" onClick={() => handleDelete(grade.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      );
};
export default ShowGrade;
