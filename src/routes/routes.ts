
import express from "express";
const Route = require("../models/route");
const router = express.Router();

router.post("/", async (req: any, res: any) => {
    const route = new Route({
        name: req.body.name,
        grade: req.body.grade,
        length: req.body.length,
        established: req.bodyestablished,
        author: req.body.author,
        sectorId: req.body.sectorId,
        cragId: req.body.cragId,
    })
    try {
        const newRoute = await route.save();
        res.status(201).json(newRoute);
    } catch (err: any) {
        res.sendStatus(400);
    }
});

module.exports = router;