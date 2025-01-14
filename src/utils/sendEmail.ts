import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import { catchAsyncError } from "../middlewares/catchAsyncError";

export const sendEmail = async (to: string, subject: string, text: string) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	await transporter.sendMail({
		// Add the 'from' address
		to,
		subject,
		text,
	});
};

export const sendHTMLEmail = async (
	to: string,
	subject: string,
	html: string,
) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	await transporter.sendMail({
		to,
		subject,
		html: html,
	});
};
