const mongoose = require('mongoose');

//  create geolocation Schema
const GeoSchema = new mongoose.Schema({
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
});

//  create ninja Schema
const NinjaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'name field is required']
    },
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

//  create ninja Model
const Ninja = mongoose.model('Ninja', NinjaSchema);
module.exports = Ninja;