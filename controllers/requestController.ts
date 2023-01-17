import { Request, Response } from "express";
import { RequestModel } from "../models/requestModel";

export const createRequest = async (req: Request, res: Response) => {
    try {
        const model = req.body;

        const { userId, requestType } = model;

        const oldRequest = await RequestModel.findOne({ userId, requestType });

        if (oldRequest && !oldRequest.isCompleted) {
            return res.status(409).send("Заявка уже обрабатывается");
        }

        const request = await RequestModel.create(model);

        res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const getRequests = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const requests = await RequestModel.find({ userId, isCompleted: false });

        res.status(200).json(requests);
    } catch {
        return res.status(500).send();
    }
};

export const updateRequest = async (req: Request, res: Response) => {
    try {
        const { userId, requestType, step } = req.body;

        const request = await RequestModel.findOne({ userId, requestType, isCompleted: false });

        if (!request) {
            return res.status(500).send();
        }

        if (request.steps.find((item) => item.step === step)) {
            return res.status(409).send();
        }

        const updated = await RequestModel.findOneAndUpdate(
            { userId, requestType, isCompleted: false },
            {
                steps: [
                    ...request.steps,
                    {
                        step,
                        completeDate: new Date(),
                    },
                ],
            }
        );

        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
};

export const completeRequest = async (req: Request, res: Response) => {
    try {
        const { userId, requestType } = req.body;

        const request = await RequestModel.findOne({ userId, requestType, isCompleted: false });

        const updated = await RequestModel.findOneAndUpdate(
            { userId, requestType, isCompleted: false },
            {
                isCompleted: true,
            }
        );

        res.status(200).json(updated);
    } catch {
        return res.status(500).send();
    }
};
