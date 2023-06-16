import { Box, Container, Stack, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom"
import oppsImage from "./oops-smiley.jpg"


const ErrorDisplay = ({error, entity}) => {
    
    if(error.cause == 'security' || error.cause =='login'){
        return <Container> 
            <Typography> {error.message} </Typography>
        </Container>
    }

    // ako je doslo do neke druge greske koja nije vezana za korisnika onda se prikaze sledeci element 
    return <Container>
    <Stack> 
        <img src={oppsImage} alt="Error" style={{width: "50%", height: "auto"}}/>
        <Typography>  An error occurred while loading {entity}. </Typography>
        <Typography> We are very sorry. Have you started the back-end server?</Typography>

        <Typography> The internal error is: </Typography>
        <Box>
            <pre>
                {error.message}
            </pre>
        </Box> 
    </Stack>
</Container>
}

export default ErrorDisplay;