import mongoose from "mongoose";

const cragSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    coordinates: {
        type: Array,
    },
    images: [{
        type: String
    }],
})

module.exports = mongoose.model("Crag", cragSchema);