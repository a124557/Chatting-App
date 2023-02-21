const express = require('express');
const PORT = 3001;
const connectToDatabase = require('./Mongo.js');
const bodyParser = require('body-parser');
const app = express();
const httpServer = require('http').createServer(app);
const options = {    
    cors: {
        origin: '*',
    }};
const io = require("socket.io")(httpServer, options);
const dotenv = require('dotenv');
const User = require('./Schema.js');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

console.log(process.env.MONGO_URI);
connectToDatabase();

app.get("/", (req, res) => {
    res.send("Connected to the server");
});

app.post('/register', async (req, res) => {
    // Generate a salt to use for hasing the password
    const salt = await bcrypt.genSalt(10);
    // Hash the user's password using the salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    
    if(!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token that will authenticate the client
    const payload = {username: user.username};
    const secretKey = process.env.JWT_TOKEN;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

// Socket.io server
/* const io = socketIo(server, {
    cors: {
        origin: '*',
    }
}); */

io.on('connection', (socket) => {

    socket.on('message', (msg) => {
        console.log('message: ', msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}); 