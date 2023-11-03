require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jgghdjgd7tdte53uj';

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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const passwordOk = bcrypt.compareSync(password, user.password);
        if (passwordOk) {
            jwt.sign(
                { email: user.email, id: user._id },
                jwtSecret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                }
            );
        } else {
            res.status(422).json('password not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const user = await User.findById(userData.id);
            res.json(user);
        });
    } else {
        res.json(null);
    }
});

app.listen(4000);
