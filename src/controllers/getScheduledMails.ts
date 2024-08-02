import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import Schedule from "../models/schedule";

export const getSchdeuledMailsByAgendaId = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { agendaId } = req.params;
        const schedule = await Schedule.findOne({ agendaId });
        res.status(200).json({
            success: true,
            message: "Scheduled mails retrieved",
            schedule,
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler("Error getting scheduled mails", 500));
    }
}

export const getAllScheduledMails = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const schedule = await Schedule.find();
        res.status(200).json({
            success: true,
            message: "Scheduled mails retrieved",
            schedule,
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler("Error getting scheduled mails", 500));
    }
}
