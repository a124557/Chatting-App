import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import withAuth from './Login-Logout HOC';
import io from 'socket.io-client';
import { width } from '@mui/system';

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
            const newMessage = { username, message };
            socket.emit('message', newMessage );
            setMessages((messages) => [...messages, newMessage]);
            setMessage('');
            console.log('message emmited');
            console.log('current messages ', messages);
        }
    };

    return (
        <Container
                style = {{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
        height: "100vh"}
        }
        >
            <Typography variant="h6" gutterBottom>Welcome to the chat page, {username}! You have sucessfully logged in!</Typography>
            
            <Box
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '75%',
                width: '75%'
            }}
            >
            
            <Box
            sx={{
            width: '75%',
            height: '75%',
            borderRadius: '16px',
            backgroundColor: '#f2f2f2',
            mb: 2,
            '&:hover': {
            backgroundColor: '#f2f2f2'
            },
            }}
            >
            <ul
            >
                {messages.map((item, index) => (
                    <li key={index} style={{textAlign: item.username != username ? 'right' : 'left'}}><b>{item.username + ": "}</b>{item.message}</li>
                ))}
            </ul>
            </Box>
            <Box
            sx = {{display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end '
    }}
            >
                            <TextField id="chatField" variant='outlined' 
            label='Type something to chat'
            value={message} 
            sx = {{
        marginRight: 1
    }}
            onChange={(event) => setMessage(event.target.value)}></TextField>
            <Button variant="contained" onClick={handleMessageSubmit} sx = {{display: 'flex', marginLeft: 1}}>Send</Button>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </Box>


            </Box>
        </Container>
    )
}

export default withAuth(Chat);