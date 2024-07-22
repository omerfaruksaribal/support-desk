const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5050

// Connect to database
connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Support Desk API\'a hoş geldiniz.'});
});


// Routes
app.use('/api/users', require('./routes/userRoutes'))

// Throwing error
app.use(errorHandler)

app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda başlatıldı.`));


