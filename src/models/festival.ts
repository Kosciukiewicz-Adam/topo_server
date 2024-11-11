import mongoose from "mongoose";

const festivalSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    cragId: {
        type: String,
    },
    country: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: String,
    },
    images: [{
        type: String,
    }],
    website: {
        type: String,
    },
    location: {
        type: String,
    },
})


module.exports = mongoose.model("Festival", festivalSchema);