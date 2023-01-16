import mongoose from "mongoose";

export enum RequestType {
    Account,
    Password,
}

type Step = {
    step: number;
    completeDate: Date;
};

export interface IRequestModel {
    steps: Step[];
    isCompleted: boolean;
    userId: number;
    requestType: RequestType;
    organization: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
}

const requestSchema = new mongoose.Schema<IRequestModel>({
    steps: { type: [Object], default: [] },
    isCompleted: { type: Boolean, default: false },
    userId: { type: Number },
    requestType: { type: Number, default: RequestType.Account },
    organization: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    patronymic: { type: String, default: null },
    email: { type: String, default: null },
});

export const RequestModel = mongoose.model("Request", requestSchema);
