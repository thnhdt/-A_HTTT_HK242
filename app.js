const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser')

const user = require('./routes/user');

const dotenv = require('dotenv');
const connectDB = require('./model/db');
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: 'http://localhost:5001', //frontend
    credentials: true
}));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

connectDB();

app.set('view engine', 'ejs');
app.set('views', './templates')

app.use('/api/user', user);

app.get('/', (req, res) => {
    res.send("HTTT Counting App");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });