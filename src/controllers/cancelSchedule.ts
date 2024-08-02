import { Agenda } from "@hokify/agenda";
import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

export const cancelSchedule = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const agenda = new Agenda({
			db: { address: process.env.MONGO_URI as string },
		});

		await agenda.start();

		const result = await agenda.cancel({ name: id });
        if(result === 0) {
            return next(new ErrorHandler("Email not found", 404));
        }
		res.status(200).json({
			success: true,
			message: "Email cancelled",
		});
	} catch (error) {
		console.error(error);
		next(new ErrorHandler("Error cancelling email", 500));
	}
};
