const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    description: String,
    photos: [String],
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
});

module.exports = mongoose.model('Place', placeSchema);
