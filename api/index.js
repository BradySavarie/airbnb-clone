require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

const bcryptSalt = bcrypt.genSaltSync(10);
mongoose.connect(process.env.MONGO_URI);

app.get('/test', (req, res) => {
    res.json('Test Ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(user);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.listen(4000);
