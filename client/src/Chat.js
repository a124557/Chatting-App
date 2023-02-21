import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';
import withAuth from './Login-Logout HOC';

function Chat(props) {
    const [username, setUsername] = useState('');
    const { handleLogout } = props;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        setUsername(decoded.username);
    }, []);

    return (
        <Container>
            <p>Welcome to the Chat page, {username}! You have sucessfully logged in!</p>
            <Box
            sx={{
            width: 300,
            height: 300,
            backgroundColor: '#F5F5',
            '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
            },
            }}
            />
            <TextField id="chatField" variant='outlined' label='Type something to chat'></TextField>
            <Button variant="contained">Send</Button>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </Container>
    )
}

export default withAuth(Chat);