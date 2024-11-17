
import express from "express";
const Festival = require("../models/festival");
const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const festivals = await Festival.find();
        res.json(festivals);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;