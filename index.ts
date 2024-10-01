import mongoose from "mongoose";

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const cors = require('cors')
app.use(cors())
const port = process.env.PORT;
mongoose.connect("mongodb+srv://topo-user:kCYQwsPsjnUevPWO@topo.u7rtq.mongodb.net/?retryWrites=true&w=majority&appName=Topo");
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("mongodb database connected"));

app.use(express.json());

const sectorsRouter = require("./routes/sectors");
const routesRouter = require("./routes/routes");
const cragsRouter = require("./routes/crags");

app.use("/sectors", sectorsRouter);
app.use("/routes", routesRouter);
app.use("/crags", cragsRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});