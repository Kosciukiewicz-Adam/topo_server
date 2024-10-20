import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    grade: {
        type: String,
    },
    length: {
        type: String,
    },
    established: {
        type: String,
    },
    author: {
        type: String,
    },
    cragId: {
        type: mongoose.Types.ObjectId
    },
    sectorId: {
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model("Route", routeSchema);