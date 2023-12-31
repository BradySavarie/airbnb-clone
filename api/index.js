require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const { error } = require('console');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
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
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + `/uploads/${newName}`,
    });
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.post('/places', (req, res) => {
    const {
        title,
        address,
        description,
        addedPhotos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;

    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            description,
            photos: addedPhotos,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        });
        res.json(placeDoc);
    });
});

app.get('/places', async (req, res) => {
    res.json(await Place.find());
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id,
        title,
        address,
        description,
        addedPhotos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (placeDoc.owner.toString() === userData.id) {
            placeDoc.set({
                title,
                address,
                description,
                photos: addedPhotos,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
        req.body;

    Booking.create({
        place,
        user: userData.id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
    })
        .then((doc) => {
            res.json(doc);
        })
        .catch((err) => {
            throw err;
        });
});

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'));
});

app.listen(4000);
