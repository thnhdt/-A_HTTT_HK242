const express = require('express');
const cors = require('cors');
const session = require('express-session');

// const auth = require('./routes/auth');
const register = require('./routes/register');
// const info = require('./routes/info');

const dotenv = require('dotenv');
const connectDB = require('./model/db');
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors({
    origin: 'http://localhost:5001', //change this
    credentials: true
}));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}));

app.use(express.json());


connectDB();


// app.use('/api/login', auth);
app.use('/api/register', register);
// app.use('/api/info', info);

app.get('/', (req, res) => {
    res.send("ReactJS + ExpressJS + MongoDB");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });