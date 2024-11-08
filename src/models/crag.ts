import mongoose from "mongoose";

const cragSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    country: {
        type: String,
    },
    coordinates: {
        type: Array,
    },
    images: [{
        type: String
    }],
    routesAmount: {
        type: Number,
    }
})

module.exports = mongoose.model("Crag", cragSchema);