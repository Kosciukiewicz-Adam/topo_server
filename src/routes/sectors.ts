
import express from "express";
const Sector = require("../models/sector");
const Route = require("../models/route");
const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const sectors = await Sector.find();

        for await (const sector of sectors) {
            const sectorRoutes = await Route.find({ sectorId: sector._id })
            sectors[sectors.indexOf(sector)].routesAmount = sectorRoutes.length;
        }

        res.json(sectors);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post("/", async (req: any, res: any) => {
    const sector = new Sector({
        name: req.body.name,
        image: req.body.image,
        imageWithRoutes: req.body.imageWithRoutes,
        cragId: req.body.cragId,
    })
    try {
        const newSector = await sector.save();
        res.status(201).json(newSector);
    } catch (err: any) {
        res.status(400).json({ message: err.message });;
    }
});

router.get('/:sectorId/routes', getSectorRoutes, (req: any, res: any) => {
    res.json(res.sectorRoutes);
})

async function getSectorRoutes(req: any, res: any, next: any) {
    let sectorRoutes
    try {
        sectorRoutes = await Route.find({ sectorId: req.params.sectorId })
        if (sectorRoutes == null) {
            return res.status(404).json({ message: 'Cannot find roues for sector' })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }

    res.sectorRoutes = sectorRoutes;
    next()
}

module.exports = router;