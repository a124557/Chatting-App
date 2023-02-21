import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import withAuth from './Login-Logout HOC';
import io from 'socket.io-client';

function Chat(props) {
    const [username, setUsername] = useState('');
    const { handleLogout } = props;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const socket = io("http://localhost:3001");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        setUsername(decoded.username);
    }, []);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message]);
        });

        socket.on('users', (users) => {
            setUsers(users);
        });

        return () => {
            socket.off('message');
            socket.off('users');
        };
    }, [socket]);

    const handleMessageSubmit = (event) => {
        event.preventDefault();
        // Check to prevent sending empty messages to the server
        if(message.trim()) {
            socket.emit('message', { username, message });
            setMessages((messages) => [...messages, message]);
            setMessage('');
        }
                    console.log('message emmited');
            console.log('current messages ', messages);
    };

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
            >
            <ul>
                {messages.map((message, index) => {
                    return (<li key={index}>
                        <strong>{message.username}:</strong> {message.message}
                    </li>)
                    }

                )}
            </ul>
            </Box>
            <TextField id="chatField" variant='outlined' 
            label='Type something to chat' 
            onChange={(event) => setMessage(event.target.value)}></TextField>
            <Button variant="contained" onClick={handleMessageSubmit}>Send</Button>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </Container>
    )
}

export default withAuth(Chat);