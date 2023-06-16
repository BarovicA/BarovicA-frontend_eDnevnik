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
  
  const ShowTeacherGrade = ({ grade }) => {
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
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tooltip disableFocusListener disableTouchListener title="Details">
                  <IconButton
                    color="primary"
                    component={NavLink}
                    to={`/main/teachergrades/${grade.id}`}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        );
  };
  
  export default ShowTeacherGrade;
  