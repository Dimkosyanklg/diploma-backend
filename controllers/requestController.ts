import { Request, Response } from "express";
import { RequestModel } from "models/requestModel";

export const createRequest = async (req: Request, res: Response) => {
    try {
        const model = req.body;

        const { userId, requestType } = model;

        const oldRequest = await RequestModel.findOne({ userId, requestType });

        if (!oldRequest.isCompleted) {
            return res.status(409).send("Заявка уже обрабатывается");
        }

        const request = await RequestModel.create(model);

        res.status(200).json();
    } catch {
        return res.status(500).send();
    }
};

export const getRequests = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const requests = await RequestModel.find({ userId });

        res.status(200).json(requests);
    } catch {
        return res.status(500).send();
    }
};

export const updateRequest = async (req: Request, res: Response) => {
    try {
        const { userId, requestType, step } = req.body;

        const request = await RequestModel.findOne({ userId, requestType });

        const updated = await RequestModel.findOneAndUpdate(
            { userId, requestType },
            {
                ...request,
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
    } catch {
        return res.status(500).send();
    }
};

export const completeRequest = async (req: Request, res: Response) => {
    try {
        const { userId, requestType } = req.body;

        const request = await RequestModel.findOne({ userId, requestType });

        const updated = await RequestModel.findOneAndUpdate(
            { userId, requestType },
            {
                ...request,
                isCompleted: true,
            }
        );

        res.status(200).json(updated);
    } catch {
        return res.status(500).send();
    }
};
