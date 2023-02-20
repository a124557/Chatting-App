import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password,
            });
            // Store the JWT token in the user's browser
            localStorage.setItem('token', response.data.token);
            console.log("Logged in");
            // We can redirect the user to the account page here
            window.location.href = "./chat";

        }
        catch (error) {
            console.log(error);
            // Error message can be shown here
        }

    }

    return (
        <Container style = {{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}
        >
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
            <TextField id="userName" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
            <TextField id="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleSubmit}>Login</Button>
            <Typography variant="subtitle1" gutterBottom>Don't have an account? 
            <Link href="/signup" variant="subtitle1" underline='none'> Sign Up</Link>
            </Typography>

        </Box>
        </Container>
    )
}

export default Login;