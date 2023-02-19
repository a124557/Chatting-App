import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Login() {
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
            <Typography variant="h3" gutterBottom>Chat App</Typography>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <TextField id="userName" label="Username" variant="outlined" />
            <TextField id="password" label="Password" variant="outlined" />
            <Button variant="contained">Login</Button>
            <Typography variant="subtitle1" gutterBottom>Don't have an account? 
            <Link href="/signup" variant="subtitle1" underline='none'> Sign Up</Link>
            </Typography>

        </Box>
        </Container>
    )
}

export default Login;