const express = require('express');
const PORT = process.env.PORT || 3001;
const connectToDatabase = require('./Mongo.js');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const User = require('./Schema.js');
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
    res.send("Connected to the server");
});

connectToDatabase();

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}); 