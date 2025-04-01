const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser')

const user = require('./routes/user');
const type = require('./routes/type');
const image = require('./routes/image');

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
app.use('/api/type', type);
app.use('/api/image', image);

app.get('/', (req, res) => {
    res.send("HTTT Counting App");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });