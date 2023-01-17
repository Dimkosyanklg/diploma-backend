import { config } from "dotenv";
import express from "express";
import { connectDB } from "./configs/database";
import bodyParser from "body-parser";
import { requestRouter } from "./routes/requestRouter";

config();
connectDB();

const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.use("/request", requestRouter);

app.listen(port, () => {
    console.log("server started");
});
