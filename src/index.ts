import mongoose from "mongoose";
import express from "express";
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const cors = require('cors')
app.use(cors())
const port = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl || "");
const db = mongoose.connection;

db.on("error", (error: any) => console.log(error));
db.once("open", () => console.log("mongodb database connected"));

app.use(express.json());

const festivalsRouter = require("./routes/festivals");
const sectorsRouter = require("./routes/sectors");
const routesRouter = require("./routes/routes");
const cragsRouter = require("./routes/crags");

app.use("/festivals", festivalsRouter);
app.use("/sectors", sectorsRouter);
app.use("/routes", routesRouter);
app.use("/crags", cragsRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});