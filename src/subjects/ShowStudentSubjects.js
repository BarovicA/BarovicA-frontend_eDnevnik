import { Card, CardContent, Typography, IconButton,
   Box, Tooltip, Dialog, DialogTitle, DialogContent, Paper,
   TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  } from "@mui/material";
import { useState } from "react";
import StarsIcon from '@mui/icons-material/Stars';

const ShowStudentSubject = ({ subject }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{  height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}
    >
      <CardContent sx={{ flexGrow: 1 }}>  
        <Typography variant="h5" align="center" sx={{ paddingBottom: "20px" }}>
          {subject.name}
        </Typography>
        <Typography color="textSecondary" align="center" sx={{ lineHeight: 2 }}>
          School year: {subject.year}
        </Typography>
        <Typography color="textSecondary" align="center" sx={{ lineHeight: 2 }}>
          Semester: {subject.semester}
        </Typography>
      </CardContent>

      <Box sx={{display: "flex", justifyContent: "center", paddingBottom: "20px"}} >
        <Tooltip disableFocusListener disableTouchListener title="Marks">
          <IconButton
            color="primary"
            onClick={handleClickOpen}
          >
            <StarsIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog onClose={handleClose} open={open} PaperComponent={Paper}>
        <DialogTitle>{subject.name} </DialogTitle>
        <DialogContent sx={{ width: 400 }}>
            marks:
            {subject.marks.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Mark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subject.marks.map((mark, index) => (
                    <TableRow key={index}>
                      <TableCell>{mark.date}</TableCell>
                      <TableCell>{mark.markValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No marks yet.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ShowStudentSubject;