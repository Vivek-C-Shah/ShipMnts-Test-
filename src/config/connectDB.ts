import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import { config } from "dotenv";
config();

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI as string);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
	}
};

export default connectDB;