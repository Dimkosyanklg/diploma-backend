import { completeRequest, createRequest, getRequests, updateRequest } from "controllers/requestController";
import express from "express";

export const requestRouter = express.Router();

requestRouter.post("/get", getRequests);
requestRouter.post("/create", createRequest);
requestRouter.post("/update", updateRequest);
requestRouter.post("/complete", completeRequest);
