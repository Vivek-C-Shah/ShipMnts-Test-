import { sendEmail } from "../utils/sendEmail";
import type { NextFunction, Request, Response } from "express";
import { Agenda } from "@hokify/agenda";
import ErrorHandler from "../utils/errorHandler";
import { v4 as uuidv4 } from "uuid";
import { saveScheduleToDB } from "./saveScheduleToDB";

//schedule email with @hokify/agenda and nodemailer
export const scheduleEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, subject, text, date, time, html } = req.body;
        if (req.body.recurring) {
            return next();
        }
        const agenda = new Agenda({
            db: { address: process.env.MONGO_URI as string },
        });
        const id = uuidv4();
        agenda.define(id, async (job) => {
            if (html) {
                await sendEmail(email, subject, html);
                console.log("Email sent");
            }
            await sendEmail(email, subject, text);
            console.log("Email sent");
        });
        await agenda.start();
        // use date, hours, minutes to schedule the email
        // format for date is YYYY-MM-DD
        // format for hours is 24 hour format
        // format for minutes is 0-59
        await agenda.schedule(`${date}T${time}:00`, id);
        req.body.agendaId = id;
        await saveScheduleToDB(req, res, next);
        res.status(200).json({
            success: true,
            message: "Email scheduled",
            id: id,
        });
    } catch (error) {
        // handle the error
        console.error(error);
        next(new ErrorHandler("Error scheduling email", 500));
    }
};
