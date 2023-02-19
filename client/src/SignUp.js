import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function SignUp() {
    return (
        <Container>
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            width: '30ch',
        }}
        >
            <Typography variant="h3" gutterBottom>Sign Up</Typography>
            <TextField id="name" label="Name" variant="outlined" />
            <TextField id="email" label="Email" variant="outlined" />
            <TextField id="confirmEmail" label="Confirm Email" variant="outlined" />
            <TextField id="userName" label="Username" variant="outlined" />
            <TextField id="password" label="Password" variant="outlined" />
            <TextField id="password" label="Confirm Password" variant="outlined" />
            <Button variant="contained">Sign Up</Button>
            <Typography variant="subtitle1" gutterBottom>Already have an account? 
            <Link href="/" variant="subtitle1" underline='none'> Login</Link>
            </Typography>

        </Box>
        </Container>
    )
}

export default SignUp;