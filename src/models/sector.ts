import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    imageWithRoutes: {
        type: String,
    },
    cragId: {
        type: mongoose.Types.ObjectId,
    },
    routesAmount: {
        type: Number,
    }
})

module.exports = mongoose.model("Sector", sectorSchema);