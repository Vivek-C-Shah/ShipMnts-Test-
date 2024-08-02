import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import Schedule from "../models/schedule";

export const saveScheduleToDB = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        // save schedule to database
        console.log("req.body", req.body);
        const schedule = new Schedule(req.body);
        await schedule.save();
        console.log("Schedule saved to database");
        return;
    } catch (error) {
        console.error(error);
        next(new ErrorHandler("Error saving schedule to database", 500));
    }
}