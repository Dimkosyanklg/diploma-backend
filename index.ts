import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./configs/database";
import bodyParser from "body-parser";
import { requestRouter } from "./routes/requestRouter";

config();
connectDB();

const port = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: process.env.FRONT_END_URL }));

app.use(bodyParser.json());

app.use("/request", requestRouter);

app.listen(port, () => {
    console.log("server started");
});
