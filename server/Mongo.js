// Connect to MongoDB database
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    .then(() => {
        console.log('Connected to MongoDB')
    })

    .catch((error) => {
        console.log('Error connecting to the database:', error)
    })
}

module.exports = connectToDatabase;