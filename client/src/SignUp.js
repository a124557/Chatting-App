import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSubmit = (event) => {
        if(password !== confirmPassword) {
            event.preventDefault();
            setPasswordsMatch(false);
        }
        else {
            event.preventDefault();
            fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name, username, email, password }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Sucess', data);
            })
            .catch((error) => {
                console.log('Error', error);
            });
        }
    };
    return (
        <Container 
        style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        height: "100vh"}
        }
        >
        <Box
        component = "form"
        onSubmit={handleSubmit}
        display="flex"
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
            <Typography variant="h3" gutterBottom style={{display: "flex", justifyContent: "center"}}>Sign Up</Typography>
            <TextField id="name" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
            <TextField id="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
            <TextField id="confirmEmail" label="Confirm Email" variant="outlined" />
            <TextField id="username" label="Username" variant="outlined" onChange = {(e) => setUsername(e.target.value)}/>
            <TextField id="password" label="Password" variant="outlined" onChange = {(e) => setPassword(e.target.value)}/>
            <TextField id="confirmPassword" label="Confirm Password" variant="outlined" onChange = {(e) => setConfirmPassword(e.target.value)} />
            <Button variant="contained" type="submit" onClick={handleSubmit}>Sign Up</Button>
            {!passwordsMatch && (<Typography color="error">Passwords do not match</Typography>)}
            <Typography variant="subtitle1" gutterBottom>Already have an account? 
            <Link href="/" variant="subtitle1" underline='none'> Login</Link>
            </Typography>

        </Box>
        </Container>
    )
}

export default SignUp;