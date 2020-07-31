const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');


const SeedSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        latName: {
            type: String,
        },
        description: {
            type: String,
        },
        hints: {
            type: String,
        },
        sowing: [{
            Start: Number,
            End: Number,
            Place: String,
        }],
        plantingDistance: Number,
        germinationTemperature: {
            lower: Number,
            upper: Number
        },
        germinationDuration: {
            lower: Number,
            upper: Number
        },
        location: String,
        harvestTime: Number,
    },
    { minimize: false },
);

SeedSchema.plugin(timestamps);
SeedSchema.plugin(mongooseStringQuery);
const Seed = mongoose.model('Seed', SeedSchema);
module.exports = Seed;