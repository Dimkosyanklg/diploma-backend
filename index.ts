import { config } from "dotenv";
import express from "express";
import { connectDB } from "./configs/database";
import bodyParser from "body-parser";
import { accountRouter } from "./routes/accountRouter";
import { passwordRouter } from "./routes/passwordRouter";

config();
connectDB();

const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.use("/account", accountRouter);
app.use("/password", passwordRouter);

app.listen(port, () => {
    console.log("server started");
});
