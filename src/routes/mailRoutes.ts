import { Router } from "express";
import { scheduleEmail } from "../controllers/scheduleEmail";
import { scheduleRecurringEmail } from "../controllers/recurringEmail";
import { cancelSchedule } from "../controllers/cancelSchedule";
import { getAllScheduledMails, getSchdeuledMailsByAgendaId } from "../controllers/getScheduledMails";

const router = Router();

router.route("/schedule-email").post(scheduleEmail, scheduleRecurringEmail);
router.route("/scheduled-emails/:id").delete(cancelSchedule);
router.route("/scheduled-emails").get(getAllScheduledMails);
router.route("/scheduled-emails/:agendaId").get(getSchdeuledMailsByAgendaId);

export default router;