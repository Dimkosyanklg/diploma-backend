import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {}).catch((error) => {
        console.error(error);
        process.exit(1);
    });
};
