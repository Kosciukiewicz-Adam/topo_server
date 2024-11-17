
import express from "express";
const router = express.Router();
const Route = require("../models/route");
const Sector = require("../models/sector");
const Crag = require("../models/crag");

router.get("/", async (req: any, res: any) => {
    try {
        const crags = await Crag.find();

        for await (const crag of crags) {
            const cragRoutes = await Route.find({ cragId: crag._id })
            crags[crags.indexOf(crag)].routesAmount = cragRoutes.length;
        }

        res.json(crags);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get('/:cragId', getCrag, (req: any, res: any) => {
    res.json(res.crag);
})

router.get('/:cragId/routes', getCragRoutes, (req: any, res: any) => {
    res.json(res.cragRoutes);
})

router.get('/:cragId/sectors', getCragSectors, (req: any, res: any) => {
    res.json(res.cragSectors);
})

router.post("/", async (req: any, res: any) => {
    const crag = new Crag({
        name: req.body.name,
        coordinates: req.body.coordinates,
        images: req.body.images,
        sectors: req.body.sectors,
        description: req.body.description,
        country: req.body.country,
    })
    try {
        const newCrag = await crag.save();
        res.status(201).json(newCrag);
    } catch (err: any) {
        res.sendStatus(400);
    }
});

async function getCrag(req: any, res: any, next: any) {
    let crag
    try {
        crag = await Crag.findById(req.params.cragId);

        if (crag) {
            const cragRoutes = await Route.find({ cragId: crag._id })
            crag.routesAmount = cragRoutes.length;
        }

        if (crag == null) {
            return res.sendStatus(404)
        }
    } catch (err: any) {
        return res.sendStatus(500)
    }

    res.crag = crag
    next()
}

async function getCragRoutes(req: any, res: any, next: any) {
    let cragRoutes
    try {
        cragRoutes = await Route.find({ cragId: req.params.cragId })
        if (cragRoutes == null) {
            return res.sendStatus(404)
        }
    } catch (err: any) {
        return res.sendStatus(500)
    }

    res.cragRoutes = cragRoutes
    next()
}

async function getCragSectors(req: any, res: any, next: any) {
    let cragSectors
    try {
        cragSectors = await Sector.find({ cragId: req.params.cragId })
        if (cragSectors == null) {
            return res.sendStatus(404)
        }

        for await (const sector of cragSectors) {
            const sectorRoutes = await Route.find({ sectorId: sector._id })
            cragSectors[cragSectors.indexOf(sector)].routesAmount = sectorRoutes.length;
        }
    } catch (err: any) {
        return res.sendStatus(500)
    }

    res.cragSectors = cragSectors
    next()
}

module.exports = router;