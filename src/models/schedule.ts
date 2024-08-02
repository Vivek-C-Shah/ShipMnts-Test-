// a model for the schedule

import { Agenda } from "@hokify/agenda";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface ISchedule {
	email: string;
	subject: string;
	text: string;
	date: string;
	time: string;
	html: string;
	recurring: string;
	days: string[];
	months: string[];
	quarters: string[];
	maxConcurrency: number;
    agendaId: string;
}

interface IScheduleModel extends ISchedule, mongoose.Document {}

const scheduleSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	text: {
		type: String,
	},
	date: {
		type: String,
	},
	time: {
		type: String,
	},
	html: {
		type: String,
	},
	recurring: {
		type: String,
		default: "once",
	},
	day: {
		type: String,
	},
	month: {
		type: String,
	},
	quarter: {
		type: String,
	},
	maxConcurrency: {
		type: Number,
	},
    agendaId: {
        type: String,
        required: true,
    },
});

scheduleSchema.pre<IScheduleModel>("save", function (next) {
    this._id = uuidv4();
    next();
});

const Schedule = mongoose.model<IScheduleModel>("Schedule", scheduleSchema);

export default Schedule;