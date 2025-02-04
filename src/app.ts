import express from "express";
import ErrorMiddleware from "./middlewares/Error";
import { config } from "dotenv";
config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import ErrorHandler from "./utils/errorHandler";
import connectDB from "./config/connectDB";
import mailRoutes from "./routes/mailRoutes";

connectDB();

const allowedOrigins = [
  "*"
];

const app = express();
const port = 3000;
app.use(cookieParser());

app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    // credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

app.use("/api/v1", mailRoutes);

app.use(ErrorMiddleware);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
