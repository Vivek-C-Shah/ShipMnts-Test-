import { sendHTMLEmail, sendEmail } from "../utils/sendEmail";
import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { Agenda } from "@hokify/agenda";
import { v4 as uuidv4 } from "uuid";
import { saveScheduleToDB } from "./saveScheduleToDB";

export const scheduleRecurringEmail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {
			email,
			subject,
			text,
			date,
			time,
			html,
			recurring,
			day,
			month,
			quarter,
			maxConcurrency,
		} = req.body;

		if (!recurring) {
			return next(new ErrorHandler("Please provide a recurring value", 400));
		}

		const agenda = new Agenda({
			db: { address: process.env.MONGO_URI as string },
		});

		const id = uuidv4();
		agenda.define(id, async (job) => {
			if (html) {
				await sendHTMLEmail(email, subject, html);
				console.log("HTML Email sent");
			} else {
				await sendEmail(email, subject, text);
				console.log("Text Email sent");
			}
		});

		await agenda.start();

		if (recurring === "daily") {
			await agenda.every(
				`0 ${time.split(":")[1]} ${time.split(":")[0]} * * *`,
				id,
			);
		} else if (recurring === "weekly") {
			await agenda.every(
				`0 ${time.split(":")[1]} ${time.split(":")[0]} * * ${day.substring(0, 3).toLowerCase()}`,
				id,
			);
		} else if (recurring === "monthly") {
			await agenda.every(
				`0 ${time.split(":")[1]} ${time.split(":")[0]} ${date.split("-")[2]} * *`,
				id,
			);
		} else if (recurring === "quarterly") {
			// Assuming quarterly means every three months on a specific day and times
			await agenda.every(
				`0 ${time.split(":")[1]} ${time.split(":")[0]} ${date.split("-")[2]} ${3 * (quarter[1] - 1) + 1} *`,
				id,
			);
		} else if (recurring === "yearly") {
			await agenda.every(
				`0 ${time.split(":")[1]} ${time.split(":")[0]} ${date.split("-")[2]} ${new Date(`${month} 1`).getMonth() + 1} *`,
				id,
			);
		} else if (recurring === "none") {
			await agenda.schedule(`${date}T${time}:00`, id);
		}

		if (maxConcurrency) {
			agenda.maxConcurrency(maxConcurrency);
		}
        req.body.agendaId = id;
		await saveScheduleToDB(req, res, next);

		res.status(200).json({
			success: true,
			message: "Email scheduled",
			id: id,
		});
	} catch (error) {
		console.error(error);
		next(new ErrorHandler("Error scheduling email", 500));
	}
};
