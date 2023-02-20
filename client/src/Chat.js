import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';

function Chat() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        setUsername(decoded.username);
    }, []);

    return (
        <Container>
            <p>Welcome to the Chat page, {username}! You have sucessfully logged in!</p>
        </Container>
    )
}

export default Chat;